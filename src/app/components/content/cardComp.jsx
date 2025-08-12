import React from "react";
import Link from "next/link";
const CardComp = ({ name, dropdownItems, linkUrl }) => {
  return (
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <ul>
            {dropdownItems.map((name, index) => (
            <li key={index}>
                <p>{name}</p>
            </li>
            ))}
            </ul>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">{linkUrl}</button>
            </div>
        </div>

  );
};
export default CardComp;