export const register = (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
};

// http://localhost:500/api/v1/register
// {
//     "email": "lfernando316@hotmail.com",
//     "password": "123123",
//     "repassword": "123123"
//   }

export const login = (req, res) => {
  res.json({ ok: true });
};
