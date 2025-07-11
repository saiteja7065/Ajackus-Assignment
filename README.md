# Employee Directory Web Interface

A modern, responsive employee management system built using HTML, CSS, vanilla JavaScript, and Freemarker templates. This application provides a clean interface for managing employee data with features like search, filtering, and pagination.

## Features

### What it does
- **Employee Dashboard**: Shows all employees in a clean grid layout
- **Add/Edit Employees**: Easy-to-use form for managing employee data
- **Delete Employees**: Safe deletion with confirmation prompts
- **Search**: Quick search by employee name or email
- **Filter**: Filter employees by name, department, or role
- **Sort**: Organize employees by name or department
- **Pagination**: View 10, 25, 50, or 100 employees per page

### Technical Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Form Validation**: Client-side validation with clear error messages
- **Local Data Management**: In-memory JavaScript array (no backend required)
- **Freemarker Integration**: Template-based initial rendering
- **Clean UI/UX**: Modern, intuitive interface design

## 📁 Project Structure

```
employee-directory/
├── src/main/resources/
│   ├── templates/
│   │   └── dashboard.ftlh          # Main Freemarker template
│   └── static/
│       ├── css/
│       │   └── style.css           # Responsive CSS styles
│       └── js/
│           ├── data.js             # Mock employee data
│           └── app.js              # Main application logic
├── screenshots/                    # Application screenshots
├── index.html                      # Testing version
└── README.md                       # Project documentation
```

## 📸 Screenshots

### Desktop View
![Desktop Dashboard](screenshots/desktop-dashboard.png)
*Main dashboard showing employee grid layout*

### Mobile View
![Mobile Dashboard](screenshots/mobile-dashboard.png)
*Responsive mobile layout*

### Add Employee Form
![Add Employee](screenshots/add-employee-form.png)
*Modal form for adding new employees*

### Search Functionality
![Search Feature](screenshots/search-functionality.png)
*Real-time search in action*

### Filter Options
![Filter Popup](screenshots/filter-popup.png)
*Advanced filtering interface*

## 🛠️ Setup and Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for proper Freemarker template rendering)

### Option 1: Simple HTML Preview (Limited Freemarker Support)
1. Clone or download the project
2. Open `src/main/resources/templates/dashboard.ftlh` in a web browser
3. Note: Freemarker directives won't render properly without a server

### Option 2: With Freemarker Server (Recommended)
1. Set up a Java environment with Freemarker support
2. Configure your server to serve static files from `src/main/resources/static/`
3. Set up Freemarker to process templates from `src/main/resources/templates/`
4. Pass the `mockEmployeeList` data to the template

### Option 3: Development Server
For development purposes, you can create a simple HTML file that includes the template content:

```bash
# Create a simple index.html for testing
cp src/main/resources/templates/dashboard.ftlh index.html
# Edit index.html to replace Freemarker directives with static content
```

## 🎯 Usage

### Adding Employees
1. Click the "Add Employee" button in the header
2. Fill in all required fields (First Name, Last Name, Email, Department, Role)
3. Click "Save" to add the employee

### Editing Employees
1. Click the "Edit" button on any employee card
2. Modify the desired fields in the form
3. Click "Save" to update the employee

### Deleting Employees
1. Click the "Delete" button on any employee card
2. Confirm the deletion in the popup dialog

### Searching and Filtering
1. Use the search bar to find employees by name or email
2. Click "Filter" to open advanced filtering options
3. Use the sort dropdown to organize employees

### Pagination
1. Use the items per page dropdown to change display count
2. Navigate between pages using Previous/Next buttons

## 🎨 Design Principles

### Responsive Design
- **Desktop**: Multi-column grid layout with hover effects
- **Tablet**: Adjusted grid with optimized spacing
- **Mobile**: Single-column layout with touch-friendly controls

### User Experience
- **Intuitive Navigation**: Clear visual hierarchy and button placement
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth transitions and visual feedback
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔧 Technical Implementation

### JavaScript Architecture
- **Class-based Structure**: `EmployeeDirectory` class manages all functionality
- **Event-driven**: Comprehensive event binding for user interactions
- **Data Management**: Local array manipulation with filtering and sorting
- **Validation**: Robust client-side form validation

### CSS Methodology
- **BEM-inspired**: Consistent class naming for maintainability
- **Mobile-first**: Progressive enhancement for larger screens
- **Flexbox/Grid**: Modern layout techniques for responsive design

### Freemarker Integration
- **Template Rendering**: Initial employee list rendered server-side
- **Data Binding**: Mock data passed via `<#assign>` directive
- **Dynamic Updates**: JavaScript handles subsequent DOM manipulation

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚧 Known Limitations

1. **No Backend Persistence**: Data resets on page refresh
2. **Freemarker Dependency**: Requires server setup for full functionality
3. **Limited File Upload**: No profile picture support
4. **Basic Search**: Simple text matching (no fuzzy search)

## 🔮 Future Enhancements

Given more time, the following improvements could be implemented:

### Functionality
- **Advanced Search**: Fuzzy search with highlighting
- **Bulk Operations**: Multi-select for batch actions
- **Export/Import**: CSV/Excel data handling
- **Profile Pictures**: Image upload and display
- **Advanced Filtering**: Date ranges, custom criteria

### Technical
- **State Management**: Implement proper state management pattern
- **API Integration**: Connect to real backend services
- **Unit Testing**: Comprehensive test coverage
- **Performance**: Virtual scrolling for large datasets
- **Accessibility**: Enhanced screen reader support

### UI/UX
- **Animations**: Smooth transitions and micro-interactions
- **Dark Mode**: Theme switching capability
- **Customization**: User preferences and layout options
- **Advanced Pagination**: Jump to page, infinite scroll option

## What I learned

Building this project helped me understand:
- How to structure a clean, maintainable front-end application
- Working with Freemarker templates for server-side rendering
- Implementing responsive design that works across devices
- Creating smooth user interactions with vanilla JavaScript
- Building forms with proper validation and error handling

## 📄 License

This project is created for educational and assessment purposes.

---

**Developed by**: Saiteja Garlapati
**Technologies**: HTML5, CSS3, Vanilla JavaScript, Freemarker template
