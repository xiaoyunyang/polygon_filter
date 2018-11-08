# polygon_filter

> A simple library which filters an array of geo locations based on their existence inside a given polygon.

Spec

- An Algorithm for determining whether points exist in Polygon
- REST / GraphQL API. Node server.
- Points and vertices of the polygon are in [GeoJSON](http://geojson.org/)
- Works with any arbitrary Poly

## Use Case:

```
const { inside, outside } = pointsInPoly({ locations, polygon });
```

## Inputs

- `locations`
- `polygon`


### `points`

A single `point` object:

```
{
  latitude: 38.899897,
  longitude: -77.026484
}
```

A `location` object:

```
{
  id: <locationId>
  latitude: 38.899897,
  longitude: -77.026484
}
```

`points` is an array of the `location` objects shown above.


### `polygon`

An array of `point` objects.


## Outputs

- `inside` - locationIds of points that are inside the polygon, including the points which overlaps with one of the edges of the polygon.
- `outside` - locationIds of points that are outside the polygon.

## Testing

[docs](/docs/testing.md) on test cases.