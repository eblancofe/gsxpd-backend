/**
 * ---------------------------------------------------------------
 *  Archivo:        local.strategy.ts
 *  Descripción:    Estrategia Local utilizada para validar las credenciales de acceso (usuario y 
 *                  contraseña) antes de generar el token JWT en el sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  16/05/2026
 *
 *  Detalles:
 *    - Extiende PassportStrategy para implementar la estrategia Local.
 *    - Recibe usuario y contraseña desde la petición.
 *    - Delegada la validación de credenciales en AuthService.
 *    - Devuelve el usuario validado para continuar el flujo de autenticación.
 * ---------------------------------------------------------------
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
   try {
    const user = await this.authService.validateUser(username, password);
    return user;
	} catch (error) {
		throw new UnauthorizedException(error.message || 'Credenciales inválidas');
  }
}
}