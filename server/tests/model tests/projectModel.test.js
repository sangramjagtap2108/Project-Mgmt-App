const Project = require('../../models/Project');
const mongooseTestSetup = require('./testSetup');
const mongoose = require('mongoose');

describe('Project Model Test', () => {

    beforeAll(async () => {
        await mongooseTestSetup.connect();
      }, 30000); // 30 seconds

      afterAll(async () => {
        await mongooseTestSetup.closeDatabase();
      }, 30000); // 30 seconds

    // Test for successfully creating a project
it('should create and save a project successfully', async () => {
    const projectData = { name: 'Test Project', description: 'A test project', status: 'Not Started' };
    const validProject = new Project(projectData);
    const savedProject = await validProject.save();
  
    expect(savedProject._id).toBeDefined();
    expect(savedProject.name).toBe(projectData.name);
    expect(savedProject.description).toBe(projectData.description);
    expect(savedProject.status).toBe(projectData.status);
  });
  
// Test for retrieving a project by ID
it('should retrieve a project by ID', async () => {
    const project = new Project({ name: 'Find Project', description: 'Find me', status: 'In Progress' });
    await project.save();
  
    const foundProject = await Project.findById(project._id);
    expect(foundProject).toBeDefined();
    expect(foundProject.name).toBe(project.name);
  });
  
  // Test for listing all projects
  it('should retrieve all projects', async () => {
    const project1 = new Project({ name: 'Project One', description: 'First Project', status: 'Completed' });
    const project2 = new Project({ name: 'Project Two', description: 'Second Project', status: 'Not Started' });
    await Promise.all([project1.save(), project2.save()]);
  
    const projects = await Project.find({});
    expect(projects.length).toBeGreaterThanOrEqual(2);
  });

  // Test for updating a project's information
it('should update a project successfully', async () => {
    const project = new Project({ name: 'Update Project', description: 'Update me', status: 'Not Started' });
    await project.save();
  
    const updatedData = { name: 'Updated Project', description: 'Updated', status: 'Completed' };
    await Project.findByIdAndUpdate(project._id, updatedData, { new: true });
  
    const updatedProject = await Project.findById(project._id);
    expect(updatedProject.name).toBe(updatedData.name);
    expect(updatedProject.description).toBe(updatedData.description);
    expect(updatedProject.status).toBe(updatedData.status);
  });

  // Test for deleting a project
it('should delete a project successfully', async () => {
    const project = new Project({ name: 'Delete Project', description: 'Delete me', status: 'In Progress' });
    await project.save();
  
    await Project.findByIdAndDelete(project._id);
    const deletedProject = await Project.findById(project._id);
  
    expect(deletedProject).toBeNull();
  });
  

  });