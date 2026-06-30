/**
 * Archivo: microservices.config.ts
 * Ubicación: config
 * Tipo: Configuración
 * Contenido: URLs base de MS Usuarios y MS Proyectos
 */

import { registerAs } from '@nestjs/config';

export default registerAs('microservices', () => ({
  usuariosUrl: process.env.MS_USUARIOS_URL || 'http://localhost:3001',
  proyectosUrl: process.env.MS_PROYECTOS_URL || 'http://localhost:3002',
}));
