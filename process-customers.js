#!/usr/bin/env node

// Script para filtrar clientes con ClientForms.items vacío
// Uso: node process-customers.js <archivo-entrada.json> [archivo-salida.json]

const fs = require('fs');
const path = require('path');

// Obtener argumentos de línea de comandos
const inputFile = process.argv[2] || 'Untitled-3.json';
const outputFile = process.argv[3] || 'filtered-customers.json';

try {
  // Leer el archivo JSON
  console.log(`Leyendo archivo: ${inputFile}`);
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  const inputData = JSON.parse(fileContent);

  // Validar estructura
  if (!inputData?.data?.listCustomers?.items) {
    throw new Error('Estructura de datos inválida. Se espera: data.listCustomers.items');
  }

  const originalCount = inputData.data.listCustomers.items.length;
  console.log(`Total de clientes encontrados: ${originalCount}`);

  // Filtrar clientes que tienen al menos un ClientForm
  const filteredItems = inputData.data.listCustomers.items.filter(customer => {
    const hasClientForms = customer.ClientForms?.items?.length > 0;
    
    if (!hasClientForms) {
      console.log(`  ✗ Eliminando: ${customer.name || customer.customerId}`);
    }
    
    return hasClientForms;
  });

  // Crear objeto filtrado
  const filteredData = {
    ...inputData,
    data: {
      ...inputData.data,
      listCustomers: {
        ...inputData.data.listCustomers,
        items: filteredItems
      }
    }
  };

  // Guardar resultado
  fs.writeFileSync(outputFile, JSON.stringify(filteredData, null, 2), 'utf8');

  // Mostrar resumen
  console.log('\n═══════════════════════════════════════');
  console.log('RESUMEN DEL FILTRADO');
  console.log('═══════════════════════════════════════');
  console.log(`Total de clientes originales: ${originalCount}`);
  console.log(`Total de clientes filtrados:  ${filteredItems.length}`);
  console.log(`Clientes eliminados:          ${originalCount - filteredItems.length}`);
  console.log(`\nArchivo guardado como: ${outputFile}`);
  console.log('═══════════════════════════════════════\n');

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
