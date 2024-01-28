const Locations = ({ locations }) => {
    return (
        <div className="">
                {locations.map(location => (
                    <div className="card bg-base-100 shadow-xl m-2" key={location._id}>
                        <figure><img className='w-full h-48 object-cover' src={location.img} alt="" /></figure>
                        

                        <div className="card-body rounded-b-lg bg-indigo-400">
                            <h2 className="card-title text-sm absolute top-3 left-3 right-3 text-gray-800 bg-white bg-opacity-75 p-4 rounded-lg">{location.place_name}</h2>
                            <p>{location.description}</p>
                            <p>{location.rating} rating</p>
                            {location.categories.map(category => (
                                <p key={category} className="badge badge-neutral">
                                    <em>{category} </em>
                                </p>
                            ))}

                        </div>
                    </div>
                ))}
            

        </div>
    );
}

export default Locations;