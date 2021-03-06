const { findShiftsBasedOnRestrict,
    findShiftBasedOnId,
    validShiftBasedOnTimeInterval,
    postNewShiftToDb,
    updateShifts,
    deleteShift } =
    require('../../server/model/shifts')
let mockShiftsArray = [
    {
        "index": 0,
        "id": "cc1b7895-fd31-4e14-9c5f-6db9e01157f4",
        "user_id": "http://localhost:3000/v1/usersa9dac956-74ee-46e0-b7f7-be02127cadac",
        "start_time": "2021-07-20T20:16:56.229Z",
        "end_time": "2021-07-20T11:32:44.243Z",
        "created_at": "2021-07-20T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 1,
        "id": "9772be0e-7005-479c-b39f-c7c9ebae97a0",
        "user_id": "http://localhost:3000/v1/users170dce68-a049-4931-8198-c2a773111cb8",
        "start_time": "2021-07-21T12:15:33.913Z",
        "end_time": "2021-07-21T02:55:08.642Z",
        "created_at": "2021-07-21T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 2,
        "id": "43fd09f1-b483-4c54-bb52-fa176eb9a96c",
        "user_id": "http://localhost:3000/v1/users77242d14-dc28-4ef9-961f-340fbabb9d43",
        "start_time": "2021-07-22T20:34:24.982Z",
        "end_time": "2021-07-22T23:09:41.590Z",
        "created_at": "2021-07-22T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 3,
        "id": "08bf92e4-c873-4e7c-9c4d-fd4e4395b9f8",
        "user_id": "http://localhost:3000/v1/users75552154-463d-4cf0-8d5f-352467c3641f",
        "start_time": "2021-07-23T11:54:25.537Z",
        "end_time": "2021-07-23T00:44:21.778Z",
        "created_at": "2021-07-23T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 4,
        "id": "f13f7bb5-8d8e-4e4b-ab22-caee6cf73508",
        "user_id": "http://localhost:3000/v1/usersfb39cb44-76f7-471f-a767-e87bc0e0eb25",
        "start_time": "2021-07-24T10:22:32.335Z",
        "end_time": "2021-07-24T10:37:46.933Z",
        "created_at": "2021-07-24T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 5,
        "id": "38bcad4f-a6e1-4be4-b8a0-47dac4f8214d",
        "user_id": "http://localhost:3000/v1/users1ec9fdf9-6472-4d25-96ee-a8050f26828d",
        "start_time": "2021-07-25T22:37:51.685Z",
        "end_time": "2021-07-25T02:13:39.075Z",
        "created_at": "2021-07-25T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    },
    {
        "index": 6,
        "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
        "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
        "start_time": "2021-07-26T12:59:48.606Z",
        "end_time": "2021-07-26T14:13:53.057Z",
        "created_at": "2021-07-26T23:49:51.156Z",
        "updated_at": "2021-07-16T23:49:51.156Z"
    }
]
describe("test find shifts", () => {
    it("should return all the shifts ", () => {
        let shifts = findShiftsBasedOnRestrict("", mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts).toBe(expect.arrayContaining(expect.toMatchObject({
                "index": 0,
                "id": "cc1b7895-fd31-4e14-9c5f-6db9e01157f4",
                "user_id": "http://localhost:3000/v1/usersa9dac956-74ee-46e0-b7f7-be02127cadac",
                "start_time": "2021-07-20T20:16:56.229Z",
                "end_time": "2021-07-20T11:32:44.243Z",
                "created_at": "2021-07-20T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            })));
        }

    });
    it("should return one shifts based on time intervel", () => {
        let shifts = findShiftsBasedOnRestrict({ start_time: "2021-07-26T12:59:48.606Z", end_time: "2021-07-26T14:13:53.057Z" }, mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts[0]).toEqual({
                "index": 6,
                "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
                "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
                "start_time": "2021-07-26T12:59:48.606Z",
                "end_time": "2021-07-26T14:13:53.057Z",
                "created_at": "2021-07-26T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            });
        }
    });
    it("should return shifts based on time intervel and order", () => {
        let shifts = findShiftsBasedOnRestrict({ start_time: "2021-07-23T11:54:25.537Z", end_time: "2021-07-26T14:13:53.057Z", sort: "aesc" }, mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts).toEqual([{
                "index": 3,
                "id": "08bf92e4-c873-4e7c-9c4d-fd4e4395b9f8",
                "user_id": "http://localhost:3000/v1/users75552154-463d-4cf0-8d5f-352467c3641f",
                "start_time": "2021-07-23T11:54:25.537Z",
                "end_time": "2021-07-23T00:44:21.778Z",
                "created_at": "2021-07-23T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            },
            {
                "index": 4,
                "id": "f13f7bb5-8d8e-4e4b-ab22-caee6cf73508",
                "user_id": "http://localhost:3000/v1/usersfb39cb44-76f7-471f-a767-e87bc0e0eb25",
                "start_time": "2021-07-24T10:22:32.335Z",
                "end_time": "2021-07-24T10:37:46.933Z",
                "created_at": "2021-07-24T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            },
            {
                "index": 5,
                "id": "38bcad4f-a6e1-4be4-b8a0-47dac4f8214d",
                "user_id": "http://localhost:3000/v1/users1ec9fdf9-6472-4d25-96ee-a8050f26828d",
                "start_time": "2021-07-25T22:37:51.685Z",
                "end_time": "2021-07-25T02:13:39.075Z",
                "created_at": "2021-07-25T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            },
            {
                "index": 6,
                "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
                "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
                "start_time": "2021-07-26T12:59:48.606Z",
                "end_time": "2021-07-26T14:13:53.057Z",
                "created_at": "2021-07-26T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            }]);
        }
    });

});

describe("test find shifts by one", () => {
    it("should return only one shift based on id", () => {
        let shifts = findShiftBasedOnId(6, mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts[0]).toEqual({
                "index": 6,
                "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
                "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
                "start_time": "2021-07-26T12:59:48.606Z",
                "end_time": "2021-07-26T14:13:53.057Z",
                "created_at": "2021-07-26T23:49:51.156Z",
                "updated_at": "2021-07-16T23:49:51.156Z"
            });
        }
    })

})
describe("test update shifts by one", () => {
    it("should return only one shift based on id", () => {
        let date = new Date().toISOString()
        let shifts = findShiftBasedOnId({
            "index": 6,
            "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
            "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
            "start_time": "2021-07-28T12:59:48.606Z",
            "end_time": "2021-07-28T14:13:53.057Z",
            "created_at": "2021-07-26T23:49:51.156Z",
            "updated_at": date
        }, mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts).toEqual({
                "index": 6,
                "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
                "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
                "start_time": "2021-07-28T12:59:48.606Z",
                "end_time": "2021-07-28T14:13:53.057Z",
                "created_at": "2021-07-26T23:49:51.156Z",
                "updated_at": date
            });
        }
    })
})

describe("test post shifts", () => {
    it("should return only one shift based on post", () => {
        let date = new Date().toISOString()
        let shift = postNewShiftToDb({
            "index": 7,
            "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
            "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
            "start_time": "2021-07-28T12:59:48.606Z",
            "end_time": "2021-07-28T14:13:53.057Z",
            "created_at": "2021-07-26T23:49:51.156Z",
            "updated_at": date
        }, mockShiftsArray);

        expect(shift).toEqual({
            "index": 7,
            "id": "efe9f61c-28f9-479d-83fb-93d2fe09cc36",
            "user_id": "http://localhost:3000/v1/usersa40493be-7ec3-4016-87dd-5e606099904a",
            "start_time": "2021-07-28T12:59:48.606Z",
            "end_time": "2021-07-28T14:13:53.057Z",
            "created_at": "2021-07-26T23:49:51.156Z",
            "updated_at": date
        });

    })

})

describe("test delete shifts by one", () => {
    it("should return only one shift based on id", () => {
        let shifts = deleteShift(6, mockShiftsArray);
        if (shifts.length > 0) {
            expect(shifts).toEqual("ok");
        }
    })

})