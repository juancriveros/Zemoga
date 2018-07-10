var votes =  {
                    "votes":[
                              {
                              "id": 1,
                              "name": "Kanye",
                              "VotesUp": 30,
                              "VotesDown": 70
                            },
                            {
                              "id": 2,
                              "name": "Mark",
                              "VotesUp": 55,
                              "VotesDown": 45
                            },
                            {
                              "id": 3,
                              "name": "Cristina",
                              "VotesUp": 20,
                              "VotesDown": 80
                            },
                            {
                              "id": 4,
                              "name": "Malala",
                              "VotesUp": 83,
                              "VotesDown": 17
                            }

                          ]
                  }

      function loadVotes()
      {
        var savedVotes = JSON.parse(localStorage.getItem("votes"));
        if(savedVotes == null)
          savedVotes = votes;
        var tt = document.getElementById("Kanye");
        for (var vote in savedVotes.votes) {
            var parent = document.getElementById(savedVotes.votes[vote].name)
            var divVotesUp = parent.getElementsByClassName("VoteUp");
            var divVotesDown = parent.getElementsByClassName("VoteDown");
            var votesUp = savedVotes.votes[vote].VotesUp;
            var VotesDown = savedVotes.votes[vote].VotesDown;
            var percentageUp = (votesUp/(votesUp+VotesDown) * 100);

            if(percentageUp%1 != 0)
              percentageUp = percentageUp.toFixed(1);

            var percentageDown = (VotesDown/(votesUp+VotesDown) * 100);

            if(percentageDown%1 != 0)
              percentageDown = percentageDown.toFixed(1);  

            divVotesUp[0].style.width =  percentageUp + "%";
            divVotesDown[0].style.width =  percentageDown + "%"; 
            var PercentageVotesup = parent.getElementsByClassName("ThumbsUpPercentage");
            var PercentageVotesdown = parent.getElementsByClassName("ThumbsDownPercentage");
            PercentageVotesup[0].innerHTML  = percentageUp + "%";
            PercentageVotesdown[0].innerHTML  = percentageDown + "%";

            if(votesUp > VotesDown)
            {
              document.getElementById(savedVotes.votes[vote].name + 'Result').src = "img/Thumbsup.png"
              document.getElementById(savedVotes.votes[vote].name + 'Result').classList.add("up-color");
              document.getElementById(savedVotes.votes[vote].name + 'Result').classList.remove("down-color");

            }
            else
            {
              document.getElementById(savedVotes.votes[vote].name + 'Result').src = "img/Thumbsdown.png" 
              document.getElementById(savedVotes.votes[vote].name + 'Result').classList.remove("up-color");
              document.getElementById(savedVotes.votes[vote].name + 'Result').classList.add("down-color");
            }
        }
      }

      (function() {
         // your page initialization code here
         // the DOM will be available here
        loadVotes();
      })();

      function selectVote(imgclicked, nameVoted, vote)
      {
        var VoteFor = nameVoted + 'Vote';
        document.getElementById(VoteFor).innerHTML = vote;
        var parentVotes = imgclicked.parentElement.parentElement;
        var voteSelected = parentVotes.getElementsByClassName("voteSelected");
        if(voteSelected.length > 0)
          voteSelected[0].classList.remove("voteSelected");

        imgclicked.children[0].classList.add("voteSelected");
      }

      function voteNow(idVote)
      {
        

        var artist = getArtist(idVote);
        var tuhmbVote = document.getElementById(artist + 'Vote').innerHTML;
        if(tuhmbVote != "")
        {
          document.getElementById(artist + 'Again').style.display = "block";
          document.getElementById(artist + 'VoteSection').style.display = "none";
          //document.getElementsByClassName(artist + 'Text')[0].innerHTML = "Thank you for voting";

          var voteArray = votes
          for (var vote in voteArray.votes)
          {
            if(vote == idVote)
            {
              if (tuhmbVote == "up")
                voteArray.votes[vote].VotesUp += 1;
              else
                voteArray.votes[vote].VotesDown += 1;
            }
          }
          localStorage.setItem("votes", JSON.stringify(votes));
          loadVotes();
        }

      }

      function getArtist(idArtist)
      {
        var artistVote; 
        switch(idArtist) {
          case 0:
              artistVote = "Kanye"
              break;
          case 1:
              artistVote = "Mark"
              break;
          case 2:
              artistVote = "Cristina"
              break;
          case 3:
              artistVote = "Malala"
              break;
        }

        return artistVote
      }

      function voteAgain(id, artistClicked)
      {
        var artist = getArtist(id);
        document.getElementById(artist + 'Again').style.display = "none";
        document.getElementById(artist + 'VoteSection').style.display = "inline-flex";
        // document.getElementsByClassName(artist + 'Text')[0].innerHTML = "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero"
        document.getElementById(artist + 'Vote').innerHTML = "";

        var parentVotes = artistClicked.parentElement.parentElement.parentElement;
        var voteSelected = parentVotes.getElementsByClassName("voteSelected");
        if(voteSelected.length > 0)
          voteSelected[0].classList.remove("voteSelected");
      }