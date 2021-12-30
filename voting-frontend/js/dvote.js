
        //Initial points
        var leftPoint = 100;

        function dVote(objectId, data) {

            if (data != "") {
                var tableView = "";

                    tableView += "<div class='row'>";
                    tableView += "<div class='col-md-12'>";
                    tableView += "<div class='title text-right'>";
                    tableView += "<h1 class='hero__title'>Total Credit：<Label id='lb_PointLeft'></Label></h1>";
                    tableView += "</div>";
                    tableView += "</div>";
                    tableView += "</div>";


                    tableView += "<div class='col-xs-12'>";
                    tableView += "<table class='table table-striped' style='width:100%''>";
                    tableView += "<thead>";
                    tableView += "<tr>";
                    tableView += "<th class='text-center'>No</th>";
                    tableView += "<th class='text-center'>Question</th>";
                    tableView += "<th class='text-center'>Summary</th>";
                    tableView += "<th class='text-center'>Vote</th>";
                    tableView += "<th class='text-center'>Response</th>";
                    tableView += "<th class='text-center'>Score</th>";
                    tableView += "</tr>";
                    tableView += "</thead>";
                    tableView += "<tbody>";


                for (loopy = 0; loopy < data.datas.length; loopy++) {
                    var ProposalID = data.datas[loopy].ProposalID;
                    var TeamName = data.datas[loopy].TeamName;
                    var ProposalTitle = data.datas[loopy].ProposalTitle;




                    tableView += "<tr>";
                    tableView += "<td class='text-center'>" + ProposalID + "</td>";
                    tableView += "<td class='text-center'>" + TeamName + "</td>";
                    tableView += "<td>" + ProposalTitle + "</td>";
                    tableView += "<td class='text-center'>";
                    tableView += "<input type='button' class='text-center md-pill md-btn md-btn--primary' onclick='btnSub(" + loopy + ")' value='-'>";
                    tableView += "<input class='pID' type='text' value='" + ProposalID +"' style='display:none' readonly>";
                    tableView += "<input id='p" + ProposalID +"' type='text' class='nvote text-center pd-0' value='0' style='width:36px' readonly>";
                    tableView += "<input type='button' class='text-center md-pill md-btn md-btn--primary' onclick='btnAdd(" +loopy +")' value='+'>";
                    tableView += "</td>";
                    
                    tableView += "<td class='text-center'></td>";

                    tableView += "<td class='text-center'>";
                    tableView += "<label class='ncost'>0</label>";
                    tableView += "</td>";
                    tableView += "</tr>";
                }


                    tableView += "</tbody>";
                    tableView += "</table>";
                    tableView += "</div>";


                document.getElementById(objectId).innerHTML = tableView;
                UpdateCost();
            } 
        }




        function btnSub(num) {
            var voteCount = --document.getElementsByClassName('nvote')[num].value;
            if (voteCount < -10) voteCount = -10;
            document.getElementsByClassName('nvote')[num].value = voteCount;
            UpdateCost();
        }
        
        function btnAdd(num) {
            if (checkPoint(num)) {
                var voteCount = ++document.getElementsByClassName('nvote')[num].value;
                document.getElementsByClassName('nvote')[num].value = voteCount;
                UpdateCost();
            }
            else {
                alert("Not enough points");
            }
        }


        function checkPoint(num) {
            var CostedPoint = 0;
            var Votes = document.getElementsByClassName('nvote');
            for (var index = 0; index < Votes.length; index++) {
                if (index == num) {
                    CostedPoint += (parseInt(Votes[index].value)+1) * (parseInt(Votes[index].value)+1);
                    continue;
                }
                
                CostedPoint += parseInt(Votes[index].value) * parseInt(Votes[index].value);
            }
            if (leftPoint - CostedPoint < 0) return false;
            else return true;
        }

        function UpdateCost() {
            var totalCost = 0;
            var CostLabels = document.getElementsByClassName('ncost');
            for (var index = 0; index < CostLabels.length; index++) {
                var voteCount = document.getElementsByClassName('nvote')[index].value;
                document.getElementsByClassName('ncost')[index].innerHTML = voteCount * voteCount;
                totalCost += voteCount * voteCount;
            }
            document.getElementById('lb_PointLeft').innerHTML = leftPoint - totalCost;
        }
        