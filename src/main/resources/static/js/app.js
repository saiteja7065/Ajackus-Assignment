// Main application class for managing employee directory
class EmployeeDirectory {
    constructor() {
        // Initialize with copy of mock data to avoid mutations
        this.employees = [...mockEmployees];
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 25;
        this.currentEditId = null;

        // Filter state management
        this.filters = {
            search: '',
            firstName: '',
            department: '',
            role: ''
        };
        this.sortBy = '';

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderEmployees();
        this.updatePagination();
    }

    bindEvents() {
        // Set up event listeners for all interactive elements
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.showForm();
        });

        document.getElementById('filter-btn').addEventListener('click', () => {
            this.toggleFilterPopup();
        });

        // Real-time search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFiltersAndSort();
        });

        // Handle sorting changes
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFiltersAndSort();
        });

        // Filter Controls
        document.getElementById('apply-filter-btn').addEventListener('click', () => {
            this.applyFilter();
        });

        document.getElementById('clear-filter-btn').addEventListener('click', () => {
            this.clearFilters();
        });

        document.getElementById('close-filter-btn').addEventListener('click', () => {
            this.toggleFilterPopup();
        });

        // Pagination Controls
        document.getElementById('items-per-page').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
            this.updatePagination();
        });

        document.getElementById('prev-page-btn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderEmployees();
                this.updatePagination();
            }
        });

        document.getElementById('next-page-btn').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderEmployees();
                this.updatePagination();
            }
        });

        // Form Controls
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        document.getElementById('cancel-form-btn').addEventListener('click', () => {
            this.hideForm();
        });

        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.hideForm();
        });

        // Modal Background Click
        document.getElementById('form-modal').addEventListener('click', (e) => {
            if (e.target.id === 'form-modal') {
                this.hideForm();
            }
        });
    }

    applyFiltersAndSort() {
        let filtered = [...this.employees];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(searchTerm) ||
                emp.lastName.toLowerCase().includes(searchTerm) ||
                emp.email.toLowerCase().includes(searchTerm)
            );
        }

        // Apply other filters
        if (this.filters.firstName) {
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(this.filters.firstName.toLowerCase())
            );
        }

        if (this.filters.department) {
            filtered = filtered.filter(emp => emp.department === this.filters.department);
        }

        if (this.filters.role) {
            filtered = filtered.filter(emp => emp.role === this.filters.role);
        }

        // Apply sorting
        if (this.sortBy) {
            filtered.sort((a, b) => {
                const aValue = a[this.sortBy].toLowerCase();
                const bValue = b[this.sortBy].toLowerCase();
                return aValue.localeCompare(bValue);
            });
        }

        this.filteredEmployees = filtered;
        this.currentPage = 1;
        this.renderEmployees();
        this.updatePagination();
    }

    applyFilter() {
        this.filters.firstName = document.getElementById('filter-firstName').value;
        this.filters.department = document.getElementById('filter-department').value;
        this.filters.role = document.getElementById('filter-role').value;
        
        this.applyFiltersAndSort();
        this.toggleFilterPopup();
    }

    clearFilters() {
        this.filters = {
            search: '',
            firstName: '',
            department: '',
            role: ''
        };
        
        document.getElementById('search-input').value = '';
        document.getElementById('filter-firstName').value = '';
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        document.getElementById('sort-select').value = '';
        
        this.sortBy = '';
        this.applyFiltersAndSort();
    }

    toggleFilterPopup() {
        const popup = document.getElementById('filter-popup');
        popup.classList.toggle('hidden');
    }

    renderEmployees() {
        const container = document.getElementById('employee-list-container');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const employeesToShow = this.filteredEmployees.slice(startIndex, endIndex);

        container.innerHTML = '';

        if (employeesToShow.length === 0) {
            container.innerHTML = '<div class="no-employees">No employees found.</div>';
            return;
        }

        employeesToShow.forEach(employee => {
            const card = this.createEmployeeCard(employee);
            container.appendChild(card);
        });

        // Bind edit and delete events
        this.bindEmployeeCardEvents();
    }

    createEmployeeCard(employee) {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.setAttribute('data-employee-id', employee.id);

        card.innerHTML = `
            <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
            <div class="employee-detail"><strong>Email:</strong> ${employee.email}</div>
            <div class="employee-detail"><strong>Department:</strong> ${employee.department}</div>
            <div class="employee-detail"><strong>Role:</strong> ${employee.role}</div>
            <div class="employee-actions">
                <button class="edit-btn btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn btn" data-id="${employee.id}">Delete</button>
            </div>
        `;

        return card;
    }

    bindEmployeeCardEvents() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const employeeId = parseInt(e.target.getAttribute('data-id'));
                this.editEmployee(employeeId);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const employeeId = parseInt(e.target.getAttribute('data-id'));
                this.deleteEmployee(employeeId);
            });
        });
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        const pageInfo = document.getElementById('page-info');
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');

        pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
    }

    showForm(employee = null) {
        const modal = document.getElementById('form-modal');
        const title = document.getElementById('form-title');
        const form = document.getElementById('employee-form');

        if (employee) {
            title.textContent = 'Edit Employee';
            this.currentEditId = employee.id;
            this.populateForm(employee);
        } else {
            title.textContent = 'Add Employee';
            this.currentEditId = null;
            form.reset();
        }

        this.clearFormErrors();
        modal.classList.remove('hidden');
    }

    hideForm() {
        const modal = document.getElementById('form-modal');
        modal.classList.add('hidden');
        this.currentEditId = null;
        this.clearFormErrors();
    }

    populateForm(employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
    }

    editEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (employee) {
            this.showForm(employee);
        }
    }

    deleteEmployee(employeeId) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employees = this.employees.filter(emp => emp.id !== employeeId);
            this.applyFiltersAndSort();
        }
    }

    handleFormSubmit() {
        if (this.validateForm()) {
            const formData = this.getFormData();

            if (this.currentEditId) {
                // Update existing employee
                const index = this.employees.findIndex(emp => emp.id === this.currentEditId);
                if (index !== -1) {
                    this.employees[index] = { ...formData, id: this.currentEditId };
                }
            } else {
                // Add new employee
                const newId = Math.max(...this.employees.map(emp => emp.id)) + 1;
                this.employees.push({ ...formData, id: newId });
            }

            this.applyFiltersAndSort();
            this.hideForm();
        }
    }

    getFormData() {
        return {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };
    }

    validateForm() {
        const formData = this.getFormData();
        let isValid = true;

        // Clear previous errors
        this.clearFormErrors();

        // Validate required fields
        if (!formData.firstName) {
            this.showFieldError('firstName', 'First name is required');
            isValid = false;
        }

        if (!formData.lastName) {
            this.showFieldError('lastName', 'Last name is required');
            isValid = false;
        }

        if (!formData.email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(formData.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        } else if (this.isEmailDuplicate(formData.email)) {
            this.showFieldError('email', 'This email is already in use');
            isValid = false;
        }

        if (!formData.department) {
            this.showFieldError('department', 'Department is required');
            isValid = false;
        }

        if (!formData.role) {
            this.showFieldError('role', 'Role is required');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isEmailDuplicate(email) {
        return this.employees.some(emp =>
            emp.email.toLowerCase() === email.toLowerCase() &&
            emp.id !== this.currentEditId
        );
    }

    showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-input');

        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmployeeDirectory();
});
