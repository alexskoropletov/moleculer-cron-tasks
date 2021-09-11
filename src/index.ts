import { ServiceSchema } from "moleculer";
import cron, { ScheduledTask } from 'node-cron';
import { Timezone } from 'tz-offset';

export interface CronTask {
  name: string;
  cronTime: string;
  timezone?: Timezone;
  callback(): void | Promise<void>;
};

const CronTasks: ServiceSchema = {
  tasks: [] as ScheduledTask[],
  name: "cron-tasks",
	created() {
		this.tasks = [];
		if (Array.isArray(this.schema.tasks)) {
			this.tasks = (this.schema.tasks as CronTask[])
        .map((task: CronTask) => cron.schedule(
          task.cronTime,
          task.callback,
          { timezone: task.timezone }
        ));
		}
		return this.Promise.resolve();
	},
	async started(): Promise<void> {
		this.tasks.map((task: ScheduledTask) => {
			task.start();
		});
	},
	async stopped(): Promise<void> {
		this.tasks.map((task: ScheduledTask) => {
			task.stop();
		});
	}
};

export default CronTasks;