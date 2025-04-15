import "./header.css";

const Header = ({title, leftChild, rightChild}) => {
  return <header className="header">
    <div className="header-left">{leftChild}</div>
    <div className="header-center">{title}</div>
    <div className="header-right">{rightChild}</div>
  </header>;
};

export default Header;
