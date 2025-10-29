#!/usr/bin/env node

/**
 * Script para obtener tu IP actual
 * Uso: node backend/scripts/get-ip.js
 */

const https = require('https');
const http = require('http');

const services = [
  { name: 'ifconfig.me', url: 'https://ifconfig.me/ip', useHttps: true },
  { name: 'icanhazip.com', url: 'https://icanhazip.com/', useHttps: true },
  { name: 'api.ipify.org', url: 'https://api.ipify.org', useHttps: true }
];

function getIPFromService(service) {
  return new Promise((resolve, reject) => {
    const protocol = service.useHttps ? https : http;
    
    protocol.get(service.url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const ip = data.trim();
        if (ip) {
          resolve(ip);
        } else {
          reject(new Error('IP vacía'));
        }
      });
      
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function getMyIP() {
  console.log('🔍 Obteniendo tu IP pública...\n');
  
  for (const service of services) {
    try {
      const ip = await getIPFromService(service);
      console.log(`✅ IP obtenida desde ${service.name}:`);
      console.log(`   ${ip}\n`);
      console.log('📋 Añade esta IP a ALLOWED_IPS en backend/middleware/ipconfig.js');
      console.log(`   const ALLOWED_IPS = [`);
      console.log(`     '127.0.0.1',`);
      console.log(`     '::1',`);
      console.log(`     '${ip}',  // Tu IP`);
      console.log(`   ];`);
      process.exit(0);
    } catch (error) {
      console.log(`❌ Error con ${service.name}, intentando siguiente servicio...`);
    }
  }
  
  console.log('❌ No se pudo obtener tu IP. Intenta manualmente:');
  console.log('   1. Visita http://localhost:3001/api/auth/my-ip cuando el servidor esté corriendo');
  console.log('   2. O ejecuta: curl ifconfig.me');
}

getMyIP();

