const scroll = (section: string) => {
  const target = document.getElementById(section);
  target?.scrollIntoView({ behavior: "smooth" });
};

export default scroll;