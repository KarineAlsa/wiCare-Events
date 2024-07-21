import cron from 'node-cron';
import {eventUpdateCase} from '../Dependencies'


// Configura la tarea programada para ejecutar cada minuto
cron.schedule('* * * * *', async () => { // Cada minuto
  console.log('Running event update task...');
  await eventUpdateCase.updateFinishedEvents();
});
