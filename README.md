# Inventory Management System

A modern web-based inventory management system built with Node.js, Express, and SQLite.

## Features

- Dashboard with key metrics
- Add, edit, and delete inventory items
- Search functionality
- Responsive design with modern UI
- Real-time updates
- Low stock alerts

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap 5
- Backend: Node.js, Express
- Database: SQLite
- Hosting: GitHub Pages

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-management-system.git
cd inventory-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3002
```

## Project Structure

```
inventory-management-system/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server_port3002.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Add new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 