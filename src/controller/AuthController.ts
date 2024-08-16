/* eslint-disable @typescript-eslint/semi */
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { type IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { registerUser, loginUser, logoutUser, getUserById } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from './types';

@Route('/api/users')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response: any = '';

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      LogSuccess(`[/api/auth/register] Register new User: ${ user }`);
      await registerUser(user).then((r) => {
        response = {
          message: `User created succesfully: ${user.name}`
        }
      });

    } else {
      LogWarning('[/api/auth/register] register user');
      response = {
        message: 'Not register user'
      }
    }
    return response;
  }

  @Post('/login')
  async loginUser (auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
      LogSuccess(`[/api/auth/login] Logged in User: ${ auth.email }`);
      let data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`
      }

    } else {
      LogWarning('[/api/auth/login] Need Auth entity user');
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Pleasem, provide an email && password to login'
      }
    };
    return response;
  }

  /**
   * Endpoint to retreive the Users in the Collection "Users" of DB
   * Middleware: validate token JWT
   * In Headers add the x-acces-token with a valid JWT
   * @param {string} id  Id of uder to retreive
   * @returns All users o user found by ID
   */
  @Get("/me")
  public async userData (@Query() id: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User  Data By Id: ${id}`);
      response = await getUserById(id);
      // Remove password so the client cannot  see it
      response.password = '';
    }
    return response;
  }

  @Post('/logout')
  public sync logoutUser (): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
