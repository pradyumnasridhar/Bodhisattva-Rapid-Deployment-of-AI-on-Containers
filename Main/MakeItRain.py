import sys
import json
import paramiko

mode = int(sys.argv[1])
if mode<1 or mode>2:
	print("Invalid mode.")
	print("Usage: MakeItRain.py <mode> <host> <password>")
	print("Mode must be either 1 (MakeItRain) or 2 (JustDrizzling)")
	sys.exit(0)
hostname = sys.argv[2]
pwd = sys.argv[3]

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.load_system_host_keys()

ssh.connect(hostname, 22, username="root", password=pwd)

commands = json.load(open("RemoteCommands.json"))
if mode == 1:
	commands = commands["MakeItRain"]
elif mode == 2:
	commands = commands["JustDrizzling"]

for command in commands:
	(stdin, stdout, stderr) = ssh.exec_command(command)
	for line in stdout.readlines():
		print(line)
	for line in stderr.readlines():
		print(line)

ssh.close()