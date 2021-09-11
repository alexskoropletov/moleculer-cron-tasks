![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-cron-tasks 

'''
import { ServiceBroker } from 'moleculer';
import CronTasks, { CronTask } from '@skoropletov/moleculer-cron-tasks';

const brokerNode1 = new ServiceBroker({
  nodeID: 'node-1',
});

brokerNode1.createService({
  name: 'cron-service',
  mixins: [CronTasks],
  crons: [
    {
      name: 'log-seconds',
      cronTime: '* * * * * *',
      task: (): void => {
        console.log('[!] second passed');
      },
    }
  ] as CronTask[]
});
'''