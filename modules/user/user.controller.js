const getProfile = async (req, res) => {
  const { first_name, last_name } = req.user;
  res.render("profile", { title: "Profile", firstName: first_name, lastName: last_name });
};

module.exports = { getProfile };
