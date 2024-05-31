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
        jobCard.id = ''; // Clear the ID so that it is not duplicated
  
        jobCard.querySelector('#logo').src = job.logo;
        jobCard.querySelector('#company').textContent = job.company;
        jobCard.querySelector('#new').textContent = job.new ? 'NEW!' : '';
        jobCard.querySelector('#featured').textContent = job.featured ? 'FEATURED' : '';
        jobCard.querySelector('#position').textContent = job.position;
        jobCard.querySelector('#postedAt').textContent = job.postedAt;
        jobCard.querySelector('#contract').textContent = job.contract;
        jobCard.querySelector('#location').textContent = job.location;
  
        const categories = jobCard.querySelector('#categories');
        categories.innerHTML = ''; // Clear any existing categories
  
        const roleButton = createFilterButton(job.role, 'role');
        categories.appendChild(roleButton);
  
        const levelButton = createFilterButton(job.level, 'level');
        categories.appendChild(levelButton);
  
        job.languages.forEach(language => {
          const langButton = createFilterButton(language, 'languages');
          categories.appendChild(langButton);
        });
  
        job.tools.forEach(tool => {
          const toolButton = createFilterButton(tool, 'tools');
          categories.appendChild(toolButton);
        });
  
        wrapper.appendChild(jobCard);
      });
    };
  
    const createFilterButton = (text, type) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', () => updateFilters(text, type));
      return button;
    };
  
    const updateFilters = (value, type) => {
      if (type === 'role' || type === 'level') {
        filters[type] = filters[type] === value ? null : value;
      } else if (type === 'languages') {
        if (filters.languages.has(value)) {
          filters.languages.delete(value);
        } else {
          filters.languages.add(value);
        }
      }
    };
  
  
  
    fetchData();
  });
  