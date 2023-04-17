import React from "react";

function Card(props) {
  const { name, sprites, types, abilities } = props.data;
  const { getShiny, shiny } = props;

  return (
    <div className="container">
      <div className="card mt-2">
        {!shiny ? (
          <img
            src={sprites.front_default}
            alt="Front Default"
            className="card-img-top w-50 mx-auto"
          />
        ) : (
          <img
            src={sprites.front_shiny}
            alt="Front Shiny"
            className="card-img-top w-50 mx-auto"
          />
        )}
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title text-center">{name}</h5>
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              {abilities.map((item) => (
                <p key={item.id} className="card-text">
                  {item.ability.name}
                </p>
              ))}
            </div>
            <div className="col-12 d-flex justify-content-between">
              {types.map((item) => (
                <p key={item.id} className="card-text">
                  {item.type.name}
                </p>
              ))}
              <button className="btn btn-secondary mr-2" onClick={() => getShiny()}>
                Shiny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
