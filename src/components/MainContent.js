import React from 'react'

function MainContent(){
    const txt = 'content'
    const txt2 = 'main'
    const date = new Date()

    return (
        <div className='MainBody'>
            <h1>MAIN</h1>
            <p>This is the {`${txt2} ${txt}`}!</p>
            <p>It is currently about {date.getHours() % 12} o'clock</p>
            <input type="checkbox" name="vehicle0" value="Bike"/>
            <label for="vehicle0"> Bike</label><br/>
            <input type="checkbox" name="vehicle2" value="Car"/>
            <label for="vehicle2"> Car</label><br/>
            <input type="checkbox" name="vehicle3" value="Bus"/>
            <label for="vehicle3"> Bus</label><br/>
            <input type="checkbox" name="vehicle4" value="Boat"/>
            <label for="vehicle4"> Boat</label><br/>
            <input type="checkbox" name="vehicle4" value="Boat"/>
            <label for="vehicle4"> Boat</label><br/>
        </div>
    )
}

export default MainContent