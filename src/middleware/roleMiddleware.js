export const authorizeRole = (role = 'admin') => {
  return (req, res, next) => {
    if (req.userRole === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Akses ditolak, hanya admin yang boleh mengakses.' });
    }
  };
};