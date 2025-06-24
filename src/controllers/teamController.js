import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/team - Get all team members with pagination and search
export const getAllTeamMembers = async (req, res) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Build search condition
    const searchCondition = search 
      ? {
          OR: [
            { nama: { contains: search } },
            { nim: { contains: search } },
            { peran: { contains: search } },
            { tugas: { contains: search } },
          ],
        } 
      : {};

    // Count total matching records for pagination
    const totalCount = await prisma.team.count({
      where: searchCondition
    });

    // Get team members with filter, pagination, and sorting
    const teamMembers = await prisma.team.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    // Return data with pagination info
    res.json({
      data: teamMembers,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/team - Create new team member
export const createTeamMember = async (req, res) => {
  try {
    const { nama, nim, peran, tugas, github, image } = req.body;
    
    // Validate required fields
    if (!nama || !nim || !peran || !tugas || !github || !image) {
      return res.status(400).json({ 
        error: 'Semua field wajib diisi (nama, nim, peran, tugas, github, image)' 
      });
    }
    
    // Create new team member
    const teamMember = await prisma.team.create({
      data: {
        nama,
        nim,
        peran,
        tugas,
        github,
        image
      }
    });
    
    res.status(201).json({
      message: 'Anggota tim berhasil ditambahkan',
      data: teamMember
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/team/:id - Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, peran, tugas, github, image } = req.body;
    
    // Validate required fields
    if (!nama || !nim || !peran || !tugas || !github || !image) {
      return res.status(400).json({ 
        error: 'Semua field wajib diisi (nama, nim, peran, tugas, github, image)' 
      });
    }
    
    // Check if team member exists
    const existingMember = await prisma.team.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingMember) {
      return res.status(404).json({ error: 'Anggota tim tidak ditemukan' });
    }
    
    // Update team member
    const updatedMember = await prisma.team.update({
      where: { id: parseInt(id) },
      data: {
        nama,
        nim,
        peran,
        tugas,
        github,
        image
      }
    });
    
    res.json({
      message: 'Data anggota tim berhasil diupdate',
      data: updatedMember
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/team/:id - Delete team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if team member exists
    const existingMember = await prisma.team.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingMember) {
      return res.status(404).json({ error: 'Anggota tim tidak ditemukan' });
    }
    
    // Delete team member
    await prisma.team.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({
      message: 'Anggota tim berhasil dihapus',
      id: parseInt(id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};