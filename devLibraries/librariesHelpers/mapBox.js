//GETTING LOCATION USING MAPBOX FORWARD GEOCODE

const mbxGeo = mapboxGeoCoding({ accessToken: process.env.MAPBOX_TOKEN })

const { body: { features } } = await mbxGeo.forwardGeocode({
    query: req.body.campground.location,
    limit: 1
}).send()

if (features.length === 0) {
    req.flash('error', `Error reading ${req.body.campground.location} location`)
    return res.redirect('/campgrounds/new')
}
const geometry = features[0].geometry
