const proxyquire = require("proxyquire");

const ModelUserMock = require("../mocks/model.user.mock");
const MongooseMock = require("../mocks/mongoose.mock");

const User = proxyquire("../../../src/controllers/user.controller", {
  "../models/schemas/user": ModelUserMock,
  "mongoose": MongooseMock,
});

describe("Usercontroller", () => {
  describe("list", () => {
    it("Return list of users", async () => {
      //Arrange
      const _doc = [
        {
          _id: "6265cac66db520204371bf8f",
          passportID: "109310569731870332613",
          username: "whiteleopard660",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        },
        {
          _id: "6275d38d64a2569382f7622a",
          passportID: "137780008797920",
          username: "blacktiger723",
          email: "migofbacc@outlook.com",
          name: "Miguel Gonzalez",
          description: "Hey Im using piggram",
          image:
            "https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519",
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0,
        },
      ];
      ModelUserMock.ans = _doc;
      //Act
      const users = await User.list();

      //Assert
        expect(users.length).toEqual(_doc.length);
    });
  });
  describe("getById", () => {
    it("Return user by ID", async () => {
      //Arrange
      const _doc = [
        {
          _id: "6265cac66db520204371bf8f",
          passportID: "109310569731870332613",
          username: "whiteleopard660",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        },
        {
          _id: "6275d38d64a2569382f7622a",
          passportID: "137780008797920",
          username: "blacktiger723",
          email: "migofbacc@outlook.com",
          name: "Miguel Gonzalez",
          description: "Hey Im using piggram",
          image:
            "https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519",
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0,
        },
      ];
      ModelUserMock.ans = _doc;
      MongooseMock.ans = true;
      //Act
      const users = await User.getById("6275d38d64a2569382f7622a");
      //Assert
      expect(users.length).toEqual(1)
    });
  });

  describe("findOneAndUpdate", () => {
    it("Return update user", async () => {
      //Arrange
      const _doc = [
        {
          _id: "6265cac66db520204371bf8f",
          passportID: "109310569731870332613",
          username: "whiteleopard660",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        },
        {
          _id: "6275d38d64a2569382f7622a",
          passportID: "137780008797920",
          username: "blacktiger723",
          email: "migofbacc@outlook.com",
          name: "Miguel Gonzalez",
          description: "Hey Im using piggram",
          image:
            "https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519",
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0,
        },
      ];
      const toupdate = [
        {
          _id: "6265cac66db520204371bf8f",
          passportID: "109310569731870332613",
          username: "whiteleopard660122334123",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        }
      ];
      ModelUserMock.ans = _doc;
      //Act
      const users = await User.update("6265cac66db520204371bf8f",toupdate);
      //Assert
      expect(users).toEqual(toupdate);
    });
  });
  describe("delete", () => {
    it("Return delete user", async () => {
      //Arrange
      const _doc = [
        {
          _id: "6265cac66db520204371bf8f",
          passportID: "109310569731870332613",
          username: "whiteleopard660",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        },
        {
          _id: "6275d38d64a2569382f7622a",
          passportID: "137780008797920",
          username: "blacktiger723",
          email: "migofbacc@outlook.com",
          name: "Miguel Gonzalez",
          description: "Hey Im using piggram",
          image:
            "https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519",
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0,
        },
      ];
      ModelUserMock.ans = _doc;
      //Act
      const users = await User.delete("6275d38d64a2569382f7622a");
      //Assert
      expect(_doc.length).toEqual(1)
      console.log(users);
    });
  });

  describe("findUserByUsername", () => {
    it("Return users with similar username", async () => {
      //Arrange
      const _doc = [
        {
          _id:  ("6265cac66db520204371bf8f"),
          passportID: '109310569731870332613',
          username: 'whiteleopard660',
          email: 'ma.gonzalezp33@gmail.com',
          name: 'Miguel Angel Gonzalez',
          description: "Hey I'm using piggram",
          image: 'https://storage.googleapis.com/piggram-7a6fb.appspot.com/web%2F2022-01-04_12180a1631e97.59',
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false
        },
        {
          _id:  ("6275d38d64a2569382f7622a"),
          passportID: '137780008797920',
          username: 'MiguelManda',
          email: 'migofbacc@outlook.com',
          name: 'Miguel Gonzalez',
          description: 'Hey Im using piggram',
          image: 'https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519',
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0
        },
        {
          _id:  ("6276f6b4f4e78a94047a4746"),
          passportID: '110604708780011996810',
          username: 'happyleopard269',
          email: 'saddexcat@hotmail.com',
          name: 'j j',
          description: "Hey I'm using piggram",
          image: 'https://storage.googleapis.com/piggram-7a6fb.appspot.com/web%2F2022-01-04_12180a1026419.59',
          createdAt: "2022-05-07T22:46:12.462Z",
          resgitrationCompleted: false,
          __v: 0
        },
        {
          _id: ("6276f75878e43ba4d0721766"),
          passportID: '104632882001136325484',
          username: 'happygoose887',
          email: 'dieguis.09.df@gmail.com',
          name: 'Diego Ferreira',
          description: "Hey I'm using piggram",
          image: 'https://lh3.googleusercontent.com/a-/AOh14Gj7a161RN1PrDWXLHfVbP-lb4Dy8Al2eiaf2SPX_kQ=s96-c',
          createdAt: "2022-05-07T22:48:56.439Z",
          resgitrationCompleted: false,
          __v: 0
        }
      ];
      ModelUserMock.ans = _doc;
      //Act
      const users = await User.findUserByUsername("happy");
      //Assert
      // expect(_doc.length).toEqual(1)
      // console.log(users);
    });
  });


});
