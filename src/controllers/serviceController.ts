import {Request , Response} from "express";
import sequelize from "../config/db";
import { Op } from "sequelize";
import Service from "../models/service";
import Category from "../models/category";
import { ServicePriceOption } from "../models/servicePriceOptions";

export async function addService(req: Request, res: Response){
    try{
        console.log("Request Body:", req.body);
        const categoryId = Number(req.params.categoryId);
        console.log("Category ID:", categoryId);
        const { name, type, priceOptions } = req.body;
        const category = await Category.findByPk(categoryId);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }   
        const transaction = await sequelize.transaction();
        try{
            const service = await Service.create({name, type:type || 'Normal', categoryId}, {transaction});
            if(priceOptions && Array.isArray(priceOptions)&& priceOptions.length){
                const toCreate = priceOptions.map((po: any)=>({duration: po.duration, price: po.price, type: po.type || 'Hourly', serviceId: service.id}));
                await ServicePriceOption.bulkCreate(toCreate, {transaction});
            }
            await transaction.commit();
            const created = await Service.findByPk(service.id, {
                include: [{model: ServicePriceOption, as: "priceOptions"}],
            });
            return res.status(201).json(created);
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
}

export async function listServicesInCategory(req: Request, res: Response){
    try{
        const categoryId = Number(req.params.categoryId);
        const category = await Category.findByPk(categoryId);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        const services = await Service.findAll({
            where: {categoryId},
            include: [{model: ServicePriceOption, as: "priceOptions"}],
        });
        return res.json(services);
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
}

export async function updateService(req: Request, res: Response){
    try{
        const categoryId = Number(req.params.categoryId);
        const serviceId = Number(req.params.serviceId);
        const { name, type, priceOptions } = req.body;

        const service = await Service.findOne({where: {id: serviceId, categoryId}});
        if(!service){
            return res.status(404).json({message: "Service not found in the specified category"});
        }
        const transaction = await sequelize.transaction();
        try{
            service.name = name || service.name;
            service.type = type || service.type;
            await service.save({transaction});
                if(Array.isArray(priceOptions)){
                const incomingIds = priceOptions.filter((po: any)=>po.id).map((po: any)=>po.id);

                await ServicePriceOption.destroy({
                    where: {
                        serviceId: service.id,
                        id: {[Op.notIn]: incomingIds.length? incomingIds : [0]},
                    },
                    transaction,
                });

                for (const po of priceOptions){
                    if(po.id){
                        const existing = await ServicePriceOption.findOne({where: {id: po.id, serviceId: service.id}});
                        if(existing){
                            existing.duration = po.duration || existing.duration;
                            existing.price = po.price || existing.price;
                            existing.type = po.type || existing.type;
                            await existing.save({transaction});
                        }
                    }else{
                        await ServicePriceOption.create({duration: po.duration, price: po.price, type: po.type || 'Hourly', serviceId: service.id}, {transaction});
                    }
    }}            await transaction.commit();
            const updated = await Service.findByPk(service.id, {
                include: [{model: ServicePriceOption, as: "priceOptions"}],
            });
            return res.json(updated);
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
}

export async function deleteService(req: Request, res: Response){
    try{
        const categoryId = Number(req.params.categoryId);
        const serviceId = Number(req.params.serviceId);
        const service = await Service.findOne({where: {id: serviceId, categoryId}});
        if(!service){
            return res.status(404).json({message: "Service not found in the specified category"});
        }
        await service.destroy();
        return res.json({message: "Service deleted"}); 
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
}
