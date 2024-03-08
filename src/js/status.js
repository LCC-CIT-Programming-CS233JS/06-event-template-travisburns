// Notice the import statements
import './general';
import navbarTemplate from '../js/navigation';
const regeneratorRuntime = require("regenerator-runtime");
import { Chart, registerables } from 'chart.js';

class Status {
  constructor() {
    document.body.insertAdjacentHTML('afterbegin', navbarTemplate);
    Chart.register(...registerables);
   
    this.$experienceTab = document.querySelector('#experienceTab');
    this.$professionTab = document.querySelector('#professionTab');
    this.$professionCanvas = document.querySelector('#professionCanvas');
    this.$experienceCanvas = document.querySelector('#experienceCanvas');
    this.$loadingIndicator = document.querySelector('#loadingIndicator');
    this.$tabArea = document.querySelector('#tabArea');
    this.$chartArea = document.querySelector('#chartArea');
    this.$errorMessage = document.querySelector('#errorMessage');
    
    
    

       this.allData;
    this.professionData;
    this.experienceData;


   // - Add instance variables for the chart objects themselves
        this.experienceChart;
        this.professionChart;
        
   // - Call loadData.  It will make the ajax call and create one graph
   // - Call addEventListeners
    this.loadData();
    this.addEventListeners();
  }
 
  /* This method will take the raw data from the api - an array of participant objects and 
     will return the number of times each value for that property occurs for a participant.
     Calling groupData with "profession" returns an object {college: 1, employee: 2, school: 1, trainee: 2} for example
  */
  groupData(data, property)
  {
     return data.map(val => val[property]).
        reduce((acc, val, i) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
        }, {}
      );
  }

/* Part 2 - Write these 2 methods. 
   Instantiate an object at the bottom of the class.
   Then TEST.  The experience chart should work at this point. */
   loadData() {
    const SERVER_URL = 'http://citweb.lanecc.net:5000/participants' 
  
    fetch(SERVER_URL)
      .then(response => response.json())
      .then(data => {
        this.allData = data;
        this.experienceData = this.groupData(data, 'experience');
        this.professionData = this.groupData(data, 'profession');
  
        // Hide loading indicator and show tab and chart areas
        this.$loadingIndicator.classList.add('visually-hidden');
        this.$tabArea.classList.remove('visually-hidden');
        this.$chartArea.classList.remove('visually-hidden');
  
        // Create and show the experience chart
        this.createExperienceChart();
        this.showExperience();
  
        // Create the profession chart (Part 3 will complete this)
        this.createProfessionChart();
      })
      .catch(error => {
        // Handle error: hide loading indicator, show error message
        this.$loadingIndicator.classList.add('visually-hidden');
        this.$errorMessage.classList.remove('visually-hidden');
        console.error('Error loading data:', error);
      });
  }

 addEventListeners() {
  // add a click event handler to the experienceTab.  Call showExperience.
  this.$experienceTab.addEventListener('click', this.showExperience.bind(this));
  // add a click event handler to the professionTab. Call showProfession.
  this.$professionTab.addEventListener('click', this.showProfession.bind(this));
}

  hideCharts() {
    this.$experienceTab.classList.remove('active');
    this.$professionTab.classList.remove('active');
    this.$professionCanvas.classList.add('visually-hidden');
    this.$experienceCanvas.classList.add('visually-hidden');
  }

  createExperienceChart() {
    const chartData = {
      datasets: [{
          data: [this.experienceData.beginner, this.experienceData.intermediate, this.experienceData.advanced], // the chart expects the values in an array in this order
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'white',
            'white',
            'white',
          ],
          borderWidth: 1
      }],
      labels: [
          'Beginner',
          'Intermediate',
          'Advanced'
      ]
    };
    new Chart(this.$experienceCanvas, {
      type: 'pie',
      data: chartData,
      options: {}
    });   
  }

  showExperience(event = null) {
    if(event) event.preventDefault();
    this.hideCharts();
    this.$experienceCanvas.classList.remove('visually-hidden');
    this.$experienceTab.classList.add('active');
  }

  /* Part 3 - Write these 2 methods. 
   Then TEST.  Both charts should now work. */

  // It's just like the loadExperience but there are 4 'slices' for these chart labels.
  // 'School Students', 'College Students', 'Trainees', 'Employees'.  The properties in the grouped data are school, college, trainee, employee
  createProfessionChart() {
    console.log("Proffesion loaded")
    const chartData = {
      datasets: [{
        data: [
          this.professionData.school || 0,
          this.professionData.college || 0,
          this.professionData.trainee || 0,
          this.professionData.employee || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: ['white', 'white', 'white', 'white'],
        borderWidth: 1
      }],
      labels: ['School Students', 'College Students', 'Trainees', 'Employees']
    };
  
    this.professionChart = new Chart(this.$professionCanvas, {
      type: 'pie',
      data: chartData,
      options: {}
    });
  }
  
  showProfession(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$professionCanvas.classList.remove('visually-hidden');
    this.$professionTab.classList.add('active');
    
  }

}

// add a window on load handler that creates a new instance of this class
window.onload = function() {
  new Status();
};