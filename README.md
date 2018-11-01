# Slack Coffee Bar

This is intended to serve as an example for anyone wishing to implement their own coffee ordering system in Slack.
Also I'm doing this to possibly replace a coffee ordering system at work :).

## Planned Features

### Order UI

- View coffee bar status
- Order coffee/drinks through Slack message menus
- Customize drink options
- Be notified of drink status

### Admin UI

- Adjust coffee bar status (open, closed)
- Adjust coffee/drinks menu through Slack message menus (create, update, delete, hide)
- Adjust customization options through Slack message text
- View drink queue (as self-deleting messages)
- Complete or deny drink requests

## Architecture

### Server(less)

- Data stored on Firebase
- All logic as short lived functions stored on Firebase, invoked as messages are interacted with

### Data

```js
{
  admins: [
    {
      email: 'barista@email.com'
    }
  ],
  commandQueue: [
    {
      id: 'abc123'
      type: 'SET_OPEN',
      payload: true
    }
  ],
  drinks: [
    {
      id,
      name: 'Chai Latte',
      description: 'Just the way you like them!',
      active: true || false,
    }
  ],
  orders: [
    {
      id,
      drinkId,
      user: 'me@email.com'
      ordered: timestamp,
      processed: timestamp,
      status: 'queued' || 'completed' || 'denied',
      customizations: 'cold with almond milk'
    }
  ],
  // Status is a collection, which will only have one document and a static ID
  status: [
    {
      id,
      open: true || false
    }
  ]
}
```
