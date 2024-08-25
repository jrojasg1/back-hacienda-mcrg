/* eslint-disable @typescript-eslint/semi */
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM
import { getAllKatas, getKataById, deleteKataById, updateKataById, createKata } from '../domain/orm/Kata.orm';
import { IKata } from "../domain/interfaces/IKata.interface";

@Route("/api/kata")
@Tags("KataController")
export class KatasController implements IKataController {
  /**
   * Endpoint to retreive the Katas in the Collection "Katas" of DB
   * @param {string} id  Id of uder to retreive (optional)
   * @returns All users o user found by ID
   */
  @Get('/')
  public async getKatas (@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/kata] Get Kata By Id: ${id}`);
      response = await getKataById(id);
    } else {
      LogSuccess('[/api/kata] Get all Kata Request');
      response = await getAllKatas(page, limit);
    }
    return response;
  };

  @Post('/')
  public async createKata (kata: IKata): Promise<any> {
    let response: any = '';

    if (kata) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      
      await createKata(kata).then((r) => {
        LogSuccess(`[/api/kata] Register new kata: ${ kata }`);
        response = {
          message: `kata created succesfully: ${kata.name}`
        }
      });

    } else {
      LogWarning('[/api/kata] register kata');
      response = {
        message: 'Not register kata'
      }
    }
    return response;
  }

  /**
   * Endpoint to delete Kata
   * @param {string} id
   * @returns message informating if deletion successfully
   */
  @Delete("/")
  public async deleteKata (@Query() id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/kata] Get Kata By Id: ${id}`);
      await deleteKataById(id).then((r) => {
        response = {
          status: 204,
          message: `Kata with id ${id} deleted sucessfully`
        }
      })
    } else {
      LogWarning('[/api/kata] Delete Kata Request WITHOUT Id');
      response = {
        status: 400,
        message: 'Pleasem, provide an ID to remove from database'
      }
    }
    return response;
  };

  @Put('/')
  public async updateKata(@Query() id: string, kata: IKata): Promise<any> {
    let response: any = '';
    if (id) {
      await updateKataById(kata, id).then((r) => {
        LogSuccess(`[/api/kata] Update Kata: ${kata}`)
        response = {
          status: 204,
          mesage: `Kata Updated successfully: ${kata.name}`
        }
      })
    } else {
      LogWarning('[/api/kata] Update Kata Request WITHOUT Id');
      response = {
        status: 400,
        message: 'Pleasem, provide an ID to remove from database'
      }
    }

    return response;
  };

}