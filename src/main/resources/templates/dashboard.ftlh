<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <header class="header">
            <h1>Employee Directory</h1>
            <div class="header-controls">
                <div class="header-search">
                    <input type="text" id="search-input" placeholder="Search by name or email...">
                    <button id="filter-btn" class="filter-btn-header">Filter</button>
                </div>
            </div>
        </header>

        <!-- Top Controls Bar -->
        <div class="top-controls">
            <div class="left-controls">
                <div class="sort-container">
                    <label for="sort-select">Sort:</label>
                    <select id="sort-select" class="sort-select">
                        <option value="">--Select--</option>
                        <option value="firstName">First Name</option>
                        <option value="department">Department</option>
                    </select>
                </div>
                <div class="items-per-page-container">
                    <label for="items-per-page">Show:</label>
                    <select id="items-per-page" class="items-per-page-select">
                        <option value="10">10</option>
                        <option value="25" selected>25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <div class="right-controls">
                <button id="add-employee-btn" class="btn btn-primary">Add Employee</button>
            </div>
        </div>

        <main class="main-content">

            <!-- Filter Popup/Sidebar -->
            <div id="filter-popup" class="filter-popup hidden">
                <div class="filter-content">
                    <h3>Filter Employees</h3>
                    <div class="filter-field">
                        <label for="filter-firstName">First Name:</label>
                        <input type="text" id="filter-firstName" class="filter-input">
                    </div>
                    <div class="filter-field">
                        <label for="filter-department">Department:</label>
                        <select id="filter-department" class="filter-input">
                            <option value="">All Departments</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label for="filter-role">Role:</label>
                        <select id="filter-role" class="filter-input">
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                        </select>
                    </div>
                    <div class="filter-actions">
                        <button id="apply-filter-btn" class="btn btn-primary">Apply Filter</button>
                        <button id="clear-filter-btn" class="btn btn-secondary">Clear</button>
                        <button id="close-filter-btn" class="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>

            <!-- Employee cards container -->
            <div id="employee-list-container" class="employee-grid">
                <!-- Server-side rendering with Freemarker -->
                <#assign employees = mockEmployeeList![]>
                <#list employees as employee>
                    <div class="employee-card" data-employee-id="${employee.id}">
                        <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
                        <div class="employee-detail"><strong>Email:</strong> ${employee.email}</div>
                        <div class="employee-detail"><strong>Department:</strong> ${employee.department}</div>
                        <div class="employee-detail"><strong>Role:</strong> ${employee.role}</div>
                        <div class="employee-actions">
                            <button class="edit-btn btn" data-id="${employee.id}">Edit</button>
                            <button class="delete-btn btn" data-id="${employee.id}">Delete</button>
                        </div>
                    </div>
                </#list>
            </div>
        </main>

        <!-- Pagination Controls -->
        <div class="pagination-container">
            <div class="pagination-controls">
                <button id="prev-page-btn" class="btn btn-secondary" disabled>Previous</button>
                <span id="page-info" class="page-info">Page 1 of 1</span>
                <button id="next-page-btn" class="btn btn-secondary" disabled>Next</button>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            © 2025 Employee Directory App. All rights reserved.
        </footer>

        <!-- Add/Edit Form Modal -->
        <div id="form-modal" class="modal hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="form-title">Add Employee</h2>
                    <button id="close-modal-btn" class="close-btn">&times;</button>
                </div>
                <form id="employee-form" class="employee-form">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required class="form-input">
                        <span class="error-message" id="firstName-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" required class="form-input">
                        <span class="error-message" id="lastName-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required class="form-input">
                        <span class="error-message" id="email-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required class="form-input">
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <span class="error-message" id="department-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="role">Role *</label>
                        <select id="role" name="role" required class="form-input">
                            <option value="">Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                        </select>
                        <span class="error-message" id="role-error"></span>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button type="button" id="cancel-form-btn" class="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>
