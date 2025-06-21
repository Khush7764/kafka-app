import { kafka } from "./client.js";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

function askQuestion(question) {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
	});
}

async function init() {
	const driver = await askQuestion("What is your name? ");

	console.log("Choose an option:");
	console.log("1. Ahmedabad");
	console.log("2. Gandhinagar");
	const option = parseInt(await askQuestion("What is your location? "), 10);

	let location;
	switch (option) {
		case 1:
			location = "Ahmedabad";
			break;
		case 2:
			location = "Gandhinagar";
			break;
		default:
			location = "Unknown";
	}

	rl.close();

	const producer = kafka.producer();

	console.log("Connecting producer");
	await producer.connect();
	console.log("Connected producer");

	console.log("Messages producing");
	await producer.send({
		topic: "rider-updates",
		messages: [
			{
				key: "location-updates",
				value: JSON.stringify({
					name: driver,
					location: location,
				}),
				partition: option === 1 ? 1 : 0,
			},
		],
	});
	console.log("Messages sent");

	await producer.disconnect();
	console.log("Producer disconnected");
}

init();
