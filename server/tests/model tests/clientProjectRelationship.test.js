const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Client = require('../../models/Client'); // Adjust the path as necessary
const Project = require('../../models/Project'); // Adjust the path as necessary
const mongooseTestSetup = require('./testSetup');

describe('Project-Client Relationship', () => {
//   let mongoServer;

//   beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const mongoUri = mongoServer.getUri();
//     await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
//   });

beforeAll(async () => {
    await mongooseTestSetup.connect();
  }, 30000); // 30 seconds

  afterAll(async () => {
    await mongooseTestSetup.closeDatabase();
  }, 30000); // 30 seconds

  it('should correctly associate a project with a client', async () => {
    // Create a client
    const client = new Client({ name: 'Test Client', email: 'testclient@example.com', phone: '1234567890' });
    const savedClient = await client.save();

    // Create a project associated with the client
    const project = new Project({
      name: 'Test Project',
      description: 'A project for testing',
      status: 'Not Started',
      clientId: savedClient._id // Associate the project with the client
    });
    const savedProject = await project.save();

    // Fetch the project from the database to verify the association
    const fetchedProject = await Project.findById(savedProject._id).populate('clientId');
    expect(fetchedProject.clientId._id.toString()).toEqual(savedClient._id.toString());
    expect(fetchedProject.clientId.name).toEqual(client.name);
    expect(fetchedProject.clientId.email).toEqual(client.email);
    expect(fetchedProject.clientId.phone).toEqual(client.phone);
  });
});
