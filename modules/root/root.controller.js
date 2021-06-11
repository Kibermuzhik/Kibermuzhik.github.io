const getIndex = async (req, res) => {
  res.status(200).render("index", { title: "Pissbaby Webpage" });
};

module.exports = { getIndex };
