import { ServiceSchema } from "moleculer";
import cron, { ScheduledTask } from 'node-cron';
import { Timezone } from 'tz-offset';

export interface CronTask {
  name: string;
  cronTime: string;
  timezone?: Timezone;
  task(): void;
};

const CronTasks: ServiceSchema = {
  crons: [] as ScheduledTask[],
  name: "cron-tasks",
	created() {
		this.crons = [];
		if (this.schema.crons) {
			this.crons = (this.schema.crons as CronTask[])
        .map((job: CronTask) => cron.schedule(job.cronTime, job.task, { timezone: job.timezone }));
		}
		return this.Promise.resolve();
	},
	async started(): Promise<void> {
		this.crons.map((job: ScheduledTask) => {
			job.start();
		});
	},
	async stopped(): Promise<void> {
		this.crons.map((job: ScheduledTask) => {
			job.stop();
		});
	}
};

export default CronTasks;