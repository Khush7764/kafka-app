import { kafka } from "./client.js";

async function init() {
	const admin = kafka.admin();
	console.log("admin connecting");
	admin.connect();
	console.log("admin connected");

	console.log("creating topics");
	await admin.createTopics({
		topics: [
			{
				topic: "rider-updates",
				numPartitions: 2,
			},
		],
	});
	console.log("Topics created");

	console.log("Disconnecting admin");
	await admin.disconnect();
}

init();
