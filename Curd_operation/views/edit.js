<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Record - CRUD Operation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-light">
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-7">
                <div class="card shadow-sm">
                    <div class="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
                        <h4 class="mb-0"><i class="fas fa-user-edit"></i> Edit Record</h4>
                        <a href="/" class="btn btn-light btn-sm"><i class="fas fa-arrow-left"></i> Back to List</a>
                    </div>
                    <div class="card-body p-4">
                        <% if (errors && errors.length > 0) { %>
                            <div class="alert alert-danger">
                                <ul class="mb-0">
                                    <% errors.forEach(error => { %>
                                        <li><%= error.msg %></li>
                                    <% }) %>
                                </ul>
                            </div>
                        <% } %>

                        <form action="/edit/<%= record._id %>" method="POST" enctype="multipart/form-data">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name *</label>
                                <input type="text" class="form-control" id="name" name="name" value="<%= record.name %>" required>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email *</label>
                                <input type="email" class="form-control" id="email" name="email" value="<%= record.email %>" required>
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone *</label>
                                <input type="text" class="form-control" id="phone" name="phone" value="<%= record.phone %>" required>
                            </div>

                            <div class="mb-3">
                                <label for="image" class="form-label">Profile Image</label>
                                <input type="file" class="form-control" id="image" name="image" accept="image/*">
                                <% if (record.image) { %>
                                    <div class="mt-2">
                                        <img src="/uploads/<%= record.image %>" alt="Current Image" class="rounded" width="60" height="60" style="object-fit: cover;">
                                        <small class="text-muted d-block">Current Image</small>
                                    </div>
                                <% } %>
                            </div>

                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" name="status">
                                    <option value="true" <%= record.status === true ? 'selected' : '' %>>Active (True)</option>
                                    <option value="false" <%= record.status === false ? 'selected' : '' %>>Inactive (False)</option>
                                </select>
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-warning text-white"><i class="fas fa-sync-alt"></i> Update Record</button>
                                <a href="/" class="btn btn-secondary">Cancel</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
