<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js MongoDB CRUD Operation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-light">
    <div class="container my-5">
        <div class="row mb-4">
            <div class="col-md-8">
                <h2><i class="fas fa-users-cog text-primary"></i> CRUD Operations with Node.js & MongoDB</h2>
            </div>
            <div class="col-md-4 text-end">
                <a href="/create" class="btn btn-primary"><i class="fas fa-user-plus"></i> Add New Record</a>
            </div>
        </div>

        <% if (success) { %>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <%= success %>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <% } %>

        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <!-- Search, Per Page Limit Form -->
                <form method="GET" action="/" class="row g-3 align-items-center">
                    <div class="col-md-5">
                        <div class="input-group">
                            <input type="text" class="form-control" name="search" value="<%= search %>" placeholder="Search by name, email, or phone...">
                            <button class="btn btn-outline-secondary" type="submit"><i class="fas fa-search"></i> Search</button>
                            <% if (search) { %>
                                <a href="/" class="btn btn-outline-danger"><i class="fas fa-times"></i> Clear</a>
                            <% } %>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex align-items-center">
                            <label for="limit" class="form-label me-2 mb-0 text-nowrap">Records per page:</label>
                            <select name="limit" id="limit" class="form-select" onchange="this.form.submit()">
                                <option value="5" <%= limit == 5 ? 'selected' : '' %>>5</option>
                                <option value="10" <%= limit == 10 ? 'selected' : '' %>>10</option>
                                <option value="15" <%= limit == 15 ? 'selected' : '' %>>15</option>
                            </select>
                            <input type="hidden" name="search" value="<%= search %>">
                        </div>
                    </div>
                    <div class="col-md-3 text-end">
                        <span class="text-muted">Total: <strong><%= totalRecords %></strong> records</span>
                    </div>
                </form>
            </div>
        </div>

        <!-- Multiple Delete Form -->
        <form action="/delete-multiple" method="POST" id="multipleDeleteForm">
            <div class="card shadow-sm">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Records List</h5>
                    <button type="submit" class="btn btn-danger btn-sm" id="deleteSelectedBtn" onclick="return confirm('Are you sure you want to delete selected records?');">
                        <i class="fas fa-trash-alt"></i> Delete Selected
                    </button>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover table-striped align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th width="40"><input type="checkbox" id="selectAll" class="form-check-input"></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Created Date</th>
                                    <th>Updated Date</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% if (records.length === 0) { %>
                                    <tr>
                                        <td colspan="9" class="text-center py-4 text-muted">No records found.</td>
                                    </tr>
                                <% } else { %>
                                    <% records.forEach(record => { %>
                                        <tr>
                                            <td>
                                                <input type="checkbox" name="ids[]" value="<%= record._id %>" class="form-check-input recordCheckbox">
                                            </td>
                                            <td>
                                                <% if (record.image) { %>
                                                    <img src="/uploads/<%= record.image %>" alt="User Image" class="rounded-circle" width="40" height="40" style="object-fit: cover;">
                                                <% } else { %>
                                                    <img src="https://via.placeholder.com/40" alt="Default Image" class="rounded-circle" width="40" height="40">
                                                <% } %>
                                            </td>
                                            <td><%= record.name %></td>
                                            <td><%= record.email %></td>
                                            <td><%= record.phone %></td>
                                            <td>
                                                <% if (record.status) { %>
                                                    <span class="badge bg-success">Active (True)</span>
                                                <% } else { %>
                                                    <span class="badge bg-secondary">Inactive (False)</span>
                                                <% } %>
                                            </td>
                                            <td><small><%= new Date(record.created_date).toLocaleString() %></small></td>
                                            <td><small><%= new Date(record.updated_date).toLocaleString() %></small></td>
                                            <td class="text-center">
                                                <a href="/edit/<%= record._id %>" class="btn btn-sm btn-warning text-white" title="Edit"><i class="fas fa-edit"></i></a>
                                                <a href="/delete/<%= record._id %>" class="btn btn-sm btn-danger" title="Soft Delete" onclick="return confirm('Are you sure you want to soft delete this record?');"><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    <% }) %>
                                <% } %>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Pagination -->
                <% if (totalPages > 1) { %>
                    <div class="card-footer bg-white py-3">
                        <nav aria-label="Page navigation">
                            <ul class="pagination justify-content-center mb-0">
                                <li class="page-item <%= currentPage === 1 ? 'disabled' : '' %>">
                                    <a class="page-link" href="/?page=<%= currentPage - 1 %>&limit=<%= limit %>&search=<%= search %>">Previous</a>
                                </li>
                                
                                <% for (let i = 1; i <= totalPages; i++) { %>
                                    <li class="page-item <%= currentPage === i ? 'active' : '' %>">
                                        <a class="page-link" href="/?page=<%= i %>&limit=<%= limit %>&search=<%= search %>"><%= i %></a>
                                    </li>
                                <% } %>

                                <li class="page-item <%= currentPage === totalPages ? 'disabled' : '' %>">
                                    <a class="page-link" href="/?page=<%= currentPage + 1 %>&limit=<%= limit %>&search=<%= search %>">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                <% } %>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Select All Checkboxes
        document.getElementById('selectAll').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.recordCheckbox');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    </script>
</body>
</html>
