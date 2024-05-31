document.addEventListener('DOMContentLoaded', () => {
    let jobData = [];
    let filters = {
        role: null,
        level: null,
        languages: new Set(),
    };
  
    const fetchData = async () => {
      try {
        const jobListings = await fetch('./data.json');
        jobData = await jobListings.json();
        displayJobs(jobData); // Display jobs initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const displayJobs = (jobs) => {
      const wrapper = document.querySelector('.wrapper');
      const jobCardTemplate = document.getElementById('jobCardTemplate');
      wrapper.innerHTML = ''; // Clear existing job cards
  
      jobs.forEach(job => {
        const jobCard = jobCardTemplate.cloneNode(true);
        jobCard.style.display = 'flex';
  
        jobCard.querySelector('#logo').src = job.logo;
        jobCard.querySelector('#company').textContent = job.company;
        jobCard.querySelector('#new').textContent = job.new ? 'NEW!' : '';
        jobCard.querySelector('#featured').textContent = job.featured ? 'FEATURED' : '';
        jobCard.querySelector('#position').textContent = job.position;
        jobCard.querySelector('#postedAt').textContent = job.postedAt;
        jobCard.querySelector('#contract').textContent = job.contract;
        jobCard.querySelector('#location').textContent = job.location;
  
        const categories = jobCard.querySelector('#categories');
  
        const roleButton = createFilterButton(job.role);
        categories.appendChild(roleButton);
  
        const levelButton = createFilterButton(job.level);
        categories.appendChild(levelButton);
  
        job.languages.forEach(language => {
          const langButton = createFilterButton(language);
          categories.appendChild(langButton);
        });
  
        job.tools.forEach(tool => {
          const toolButton = createFilterButton(tool);
          categories.appendChild(toolButton);
        });
  
        wrapper.appendChild(jobCard);
      });
    };
  
    const createFilterButton = (text) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', () => filterJobs(text));
      return button;
    };
  
    const filterJobs = () => {
        const filteredJobs = jobData.filter(job => {
            const matchesRole = filters.role ? job.role === filters.role : true;
            const matchesLevel = filters.level ? job.level === filters.level : true;
            const matchesLanguages = filters.languages.size > 0 ? job.languages.some(lang => filters.languages.has(lang)) : true;

            return matchesRole && matchesLevel && matchesLanguages;
        });
        displayJobs(filterJobs);
    };
fetchData();


  
  });
  