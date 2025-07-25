# Medical Imaging Portfolio Website

A modern, responsive portfolio website designed for medical imaging and application researchers. Built with HTML5, CSS3, and vanilla JavaScript with markdown support for easy content updates.

## Features

- **Modern Design**: Clean, aesthetic design with smooth animations and transitions
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Easy Content Management**: Update content through simple markdown and JSON files
- **Dynamic Loading**: Content loads dynamically from markdown files
- **GitHub Pages Ready**: Configured for easy deployment on GitHub Pages
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant with proper ARIA labels

## Quick Setup

1. **Fork this repository** to your GitHub account
2. **Rename the repository** to `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
3. **Enable GitHub Pages** in repository settings
4. **Customize your content** by editing the files in the `content/` directory
5. **Add your profile image** as `assets/images/profile.jpg`

## Content Customization

### Personal Information
- Edit `content/hero.md` for your hero section description
- Edit `content/about.md` for your detailed about section
- Update `content/contact.json` with your email and location
- Update `content/social.json` with your social media links

### Professional Content
- **Stats**: Update `content/stats.json` with your publication count, projects, and experience
- **Research**: Edit `content/research.json` to showcase your research interests
- **Projects**: Update `content/projects.json` with your featured projects
- **Publications**: Edit `content/publications.json` with your academic publications
- **Achievements**: Update `content/achievements.json` with your milestones
- **News**: Edit `content/news.json` for latest updates
- **Blog**: Update `content/blog.json` with your blog posts

### Images and Files
- Replace `assets/images/profile.jpg` with your professional photo
- Add project images to `files/` directory (e.g., `files/project-name.jpg`)
- Add your research papers and documents to `files/` directory (e.g., `files/paper-name.pdf`)
- Reference these files in your JSON content files using relative paths like `"files/filename.ext"`
- Blog images can also be stored in `files/` directory

## File Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── content/               # Content files (easily editable)
│   ├── hero.md           # Hero section content
│   ├── about.md          # About section content
│   ├── stats.json        # Statistics numbers
│   ├── research.json     # Research interests
│   ├── projects.json     # Featured projects
│   ├── publications.json # Academic publications
│   ├── achievements.json # Timeline of achievements
│   ├── news.json         # Latest news items
│   ├── blog.json         # Blog posts
│   ├── contact.json      # Contact information
│   └── social.json       # Social media links
├── files/                 # Your files (PDFs, project images, etc.)
│   ├── MISA_FINAL_REPORT_MKH_FF_DR.pdf  # Research papers
│   ├── brain-segmentation-project.jpg   # Project screenshots
│   └── [other files...]   # Other project files and images
├── assets/
│   └── images/           # Website assets (profile photo, etc.)
└── README.md            # This file
```

## Customization Guide

### Colors and Styling
- Primary color: `#3498db` (blue)
- Accent color: `#9b59b6` (purple)
- Background: `#ffffff` (white)
- Text: `#333333` (dark gray)

To change colors, edit the CSS variables in `css/style.css`.

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding styles to `css/style.css`
3. Add JavaScript functionality to `js/main.js`
4. Create content files in the `content/` directory

### Social Media Links
Update `content/social.json` with your profiles:
```json
{
  "linkedin": "https://linkedin.com/in/your-profile",
  "github": "https://github.com/your-username",
  "twitter": "https://twitter.com/your-handle",
  "orcid": "https://orcid.org/0000-0000-0000-0000",
  "scholar": "https://scholar.google.com/citations?user=your-id"
}
```

### Contact Form
The contact form includes basic client-side handling. For full functionality, you may want to integrate with services like:
- Formspree
- Netlify Forms
- EmailJS
- Your own backend service

## GitHub Pages Deployment

1. **Repository Setup**:
   - Repository name must be `yourusername.github.io`
   - Make sure the repository is public

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)

3. **Custom Domain** (optional):
   - Add `CNAME` file with your domain name
   - Configure DNS settings with your domain provider

## Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Performance Features

- Optimized images and assets
- Efficient CSS and JavaScript
- Lazy loading for images
- Smooth scrolling and animations
- Mobile-first responsive design

## SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt texts for images
- Structured data markup ready

## Accessibility Features

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help customizing the website, feel free to:
- Open an issue on GitHub
- Check the code comments for guidance
- Refer to the documentation in this README

---

**Happy coding and best of luck with your career!** 🚀