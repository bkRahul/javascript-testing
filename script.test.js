const fetch = require("node-fetch");

const { googleSearch, getPeople } = require("./script");

//mock db
const googleDbMock = [
  "cats.com",
  "onlycats.com",
  "dogs.com",
  "onlydogs.com",
  "catsndogs.com",
  "animals.com",
  "soups.com",
  "recipes.com",
];

//group tests
describe("google search", () => {
  //unit tests
  it("searches google", () => {
    //check assertions
    expect.assertions(2);

    expect(googleSearch("test", googleDbMock)).toEqual([]);
    expect(googleSearch("cat", googleDbMock)).toEqual([
      "cats.com",
      "onlycats.com",
    ]);
  });

  it("works with undefined and null input", () => {
    expect(googleSearch(undefined, googleDbMock)).toEqual([]);
    expect(googleSearch(null, googleDbMock)).toEqual([]);
  });

  it("does not return more than 2 elements", () => {
    expect(googleSearch(".com", googleDbMock).length).toEqual(2);
  });
});

//async tests
//group tests
describe("swapi api", () => {
  it("calls api to get people count", (done) => {
    //always check assertions in asynchronous
    expect.assertions(1);
    //always return promise in asynchronous else use done callback
    getPeople(fetch).then((data) => {
      expect(data.count).toEqual(82);
      //test waits until done is called
      done();
    });
  });

  it("calls api to get people results to be array", () => {
    //check assertions
    expect.assertions(1);
    //always return promise in asynchronous else use done callback
    return getPeople(fetch).then(({ results }) => {
      expect(results).toEqual(expect.any(Array));
    });
  });

  it("calls api to get people results array length to be greater than 5", async () => {
    //check assertions
    expect.assertions(1);
    //always return promise
    const data = await getPeople(fetch);
    expect(data.results.length).toBeGreaterThan(5);
  });

  it("mocks the api call ", async () => {
    //mock a fetch function
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 82,
            results: [
              {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                gender: "male",
              },
              {
                name: "C-3PO",
                height: "167",
                mass: "75",
                gender: "n/a",
              },
              {
                name: "R2-D2",
                height: "96",
                mass: "32",
                gender: "n/a",
              },
              {
                name: "Darth Vader",
                height: "202",
                mass: "136",
                gender: "male",
              },
              {
                name: "Leia Organa",
                height: "150",
                mass: "49",
                gender: "female",
              },
            ],
          }),
      })
    );
    const { count, results } = await getPeople(mockFetch);
    //check assertions
    expect.assertions(5);
    expect(count).toEqual(82);
    expect(results).toEqual(expect.any(Array));
    expect(results.length).toBeGreaterThan(4);
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toHaveBeenCalledWith("https://swapi.dev/api/people/");
  });
});
