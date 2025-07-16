/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable @typescript-eslint/semi */
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { ICowController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { getAllCows, getCowById, deleteCowById, updateCowById, createCow } from "../domain/orm/Cow.orm";
import { ICow } from "@/domain/interfaces/ICow.interface";




@Route("/api/cows")
@Tags("CowController")
export class CowController implements ICowController {

    /**
     * Endpoint to retreive the Users in the Collection "Users" of DB
     * @param {string} id  Id of uder to retreive (optional)
     * @returns All users o user found by ID
    */
    @Get("/")
    public async getCows(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = '';
        if (id) {
            LogSuccess(`[/api/users] Get Cow By Id: ${id}`);
            response = await getCowById(id);
        } else {
            LogSuccess('[/api/users] Get all Cows Request');
            response = await getAllCows(page, limit);
        }
        return response;
    }

    /**
     * Endpoint to create cow
     * @param {cow} ICow  Object with cow data
     * @returns message informating if creation successfully
    */
    @Post('/')
    public async createCow(cow: ICow): Promise<any> {
        let response: any = '';

        if (cow) {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string

            await createCow(cow).then((r) => {
                LogSuccess(`[/api/cows] Register new cow: ${JSON.stringify(cow)}`);
                response = {
                    message: `Cow created successfully: ${cow.name}`
                }
            });

        } else {
            LogWarning('[/api/cow] register cow');
            response = {
                message: 'Not register cow'
            }
        }
        return response;
    }

    /**
     * Endpoint to delete user
     * @param {string} id 
     * @returns message informating if deletion successfully
    */
    @Delete("/")
    public async deleteCow(@Query() id?: string): Promise<any> {
        if (!id) {
            LogWarning('[/api/cow] Delete cow Request WITHOUT Id');
            return {
            status: 400,
            message: 'Please, provide an ID to remove from database'
            };
        }
        LogSuccess(`[/api/cow] Delete Cow By Id: ${id}`);

        try {
            const result = await deleteCowById(id);
            if (result.deletedCount === 0) {
                return {
                    status: 404,
                    message: `Cow with id ${id} not found`
                };
            }
            return {
                status: 204,
                message: `Cow with id ${id} deleted successfully`
            };
        }catch (error) {
            return {
                status: 500,
                message: 'An error occurred while deleting the cow'
            };
        }
    }


    @Put('/')
    public async updateCow(id: string, @Query() cow: any,): Promise<any> {
        let response: any = '';
        if (id) {
            await updateCowById(cow, id).then((r) => {
                LogSuccess(`[/api/users] Update cow: ${JSON.stringify(cow)}`)
                response = {
                    status: 204,
                    message: `Cow updated successfully: ${cow.name}`
                }
            })
        } else {
            LogWarning('[/api/users] Update cow Request WITHOUT Id');
            response = {
                status: 400,
                message: 'Please, provide an ID to update in database'
            }
        }

        return response;
    }

}
