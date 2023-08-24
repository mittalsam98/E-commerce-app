import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  if (process.env.SECRET !== undefined) {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: '1d'
    });
  }
};

export default generateToken;
