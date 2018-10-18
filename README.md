# polygon_filter

> A simple library which filters an array of geo locations based on their existence inside a given polygon.

## Use Case:

```
const { inside, outside } = polygonFilter({ locations, polygon });
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
  <locationId>: {
    latitude: 38.899897,
    longitude: -77.026484
  }
}
```

`points` is an array of the `location` objects shown above.


### `polygon`

An array of `point` objects.


## Outputs

- `inside` - locationIds of points that are inside the polygon, including the points which overlaps with one of the edges of the polygon.
- `outside` - locationIds of points that are outside the polygon.
