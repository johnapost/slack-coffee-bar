# Slack Coffee Bar
This is intended to serve as an example for anyone wishing to implement their own coffee ordering system in Slack.

## Planned Features

### Server(less)
* Data stored on Firebase
* All logic as short lived functions stored on Firebase, invoked as messages are interacted with

### Order UI
* View coffee bar status
* Order coffee/drinks through Slack message menus
* Customize drink options 
* Be notified of drink status

### Admin UI
* Adjust coffee bar status (open, closed)
* Adjust coffee/drinks menu through Slack message menus
* Adjust customization options through Slack message menus (milk, syrups, hot/cold)
* View drink queue (as self-deleting messages)
* Complete or deny drink requests