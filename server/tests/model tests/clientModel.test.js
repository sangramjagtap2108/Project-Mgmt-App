const Client = require('../../models/Client');
const mongooseTestSetup = require('./testSetup');
const mongoose = require('mongoose');

describe('Client Model Test', () => {

    beforeAll(async () => {
        await mongooseTestSetup.connect();
      }, 30000); // 30 seconds

      afterAll(async () => {
        await mongooseTestSetup.closeDatabase();
      }, 30000); // 30 seconds

    // Test for successfully creating a client
it('should create and save a client successfully', async () => {
    const clientData = { name: 'Test Client', email: 'test@example.com', phone: '1234567890' };
    const validClient = new Client(clientData);
    const savedClient = await validClient.save();
  
    expect(savedClient._id).toBeDefined();
    expect(savedClient.name).toBe(clientData.name);
    expect(savedClient.email).toBe(clientData.email);
    expect(savedClient.phone).toBe(clientData.phone);
  });

// Test for retrieving a client by ID
it('should retrieve a client by ID', async () => {
    const client = new Client({ name: 'Find Me', email: 'findme@example.com', phone: '1234567890' });
    await client.save();
  
    const foundClient = await Client.findById(client._id);
    expect(foundClient).toBeDefined();
    expect(foundClient.name).toBe(client.name);
  });
  
  // Test for listing all clients
  it('should retrieve all clients', async () => {
    const client1 = new Client({ name: 'Client One', email: 'one@example.com', phone: '1234567890' });
    const client2 = new Client({ name: 'Client Two', email: 'two@example.com', phone: '0987654321' });
    await Promise.all([client1.save(), client2.save()]);
  
    const clients = await Client.find({});
    expect(clients.length).toBeGreaterThanOrEqual(2);
  });

  // Test for updating a client's information
it('should update a client successfully', async () => {
    const client = new Client({ name: 'Update Me', email: 'updateme@example.com', phone: '1234567890' });
    await client.save();
  
    const updatedData = { name: 'Updated Name', email: 'updated@example.com', phone: '0987654321' };
    await Client.findByIdAndUpdate(client._id, updatedData);
  
    const updatedClient = await Client.findById(client._id);
    expect(updatedClient.name).toBe(updatedData.name);
    expect(updatedClient.email).toBe(updatedData.email);
    expect(updatedClient.phone).toBe(updatedData.phone);
  });

  // Test for deleting a client
it('should delete a client successfully', async () => {
    const client = new Client({ name: 'Delete Me', email: 'deleteme@example.com', phone: '1234567890' });
    await client.save();
  
    await Client.findByIdAndDelete(client._id);
    const deletedClient = await Client.findById(client._id);
  
    expect(deletedClient).toBeNull();
  });
  

  });
  