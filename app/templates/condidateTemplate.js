export const candidateTemplate = (data) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${data.name} - ${new Date()}</title>
            <style>#header, #footer { padding: 0 !important; }</style>
            <style>
              html,
              body {
                margin: 0;
                padding: 0;
              }
        
              a {
                text-decoration: inherit;
                color: inherit;
              }
        
              * {
                box-sizing: border-box;
              }
              .page {
                page-break-after: always;
              }
              .container {
                text-align: center;
                background-color: #fcfcfc;
                color: #333333;
              }
              .user-profile {
                margin-top: 30px;
                text-align: center;
              }
              .user-profile img {
                border-radius: 50%;
              }
              .resume-content {
                max-height: unset;
                opacity: 1;
                position: static;
              }
        
              .info-container .info-text {
                padding: 0.1em;
                display: block;
                line-height: 1.5em;
              }
        
              .section-content {
                margin: auto;
              }
        
              .section-heading {
                font-size: 2.1em;
                letter-spacing: 0.1em;
                word-spacing: 0.2em;
              }
        
              .grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }
        
              .grid-item {
                border: 0.1em solid #999;
                padding: 0.5em 1em;
                margin: 0.5em;
                max-width: 10em;
                flex-grow: 1;
                flex-basis: 20%;
              }
        
              .grid-title {
                font-weight: bolder;
                font-size: 1em;
                padding-bottom: 0.2em;
                margin: 0.3em auto;
              }
              .para {
                line-height: 2em;
                text-align: center;
                font-size: 1.3em;
                padding: 0.5em;
                font-weight: 500;
              }
        
              .list {
                list-style: circle;
                text-align: center;
                font-weight: 500;
                font-size: 1.15em;
                line-height: 1.7em;
                padding: 0 2em;
                list-style-position: inside;
              }
        
              .list a {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="container">
                <header>
                  <div class="user-profile">
                    <img
                      src="${data.profile}"
                      alt="${data.name}"
                      width="100"
                    />
                  </div>
                  <h1 class="page-heading">${data.name}</h1>
                  <h1 class="page-heading">${data.professional_title}</h1>
                  <div class="resume-content">
                    <div class="info-container">
                      <strong>
                        <a class="link info-text" href="tel:+91-${data.phone}"
                          >+91-${data.phone}</a
                        >
                        <span class="info-text">${data.address || ""}</span>
                        <a class="link info-text" href="mailto:{email}">${data.email}</a>
                        ${data.linkedin_url ? `<a class="link info-text" target="_blank" href="${data.linkedin_url}">${data.linkedin_url}</a >` : null}
                        ${data.github_url ? `<a class="link info-text" target="_blank" href="${data.github_url}">${data.github_url}</a >` : null}
                      </strong>
                    </div>
                  </div>
                </header>
                <section class="page-section resume-content">
                  <div class="section-content">
                    <h2 class="section-heading">About Me</h2>
                    <p class="para">${data.short_information}</p>
                  </div>
                  <div class="section-content">
                    <h2 class="section-heading">My Skills</h2>
                    <div class="grid">
                      ${data.skills.map(function (dd) {
            return (
                `<div class="grid-item">
                    <h3 class="grid-title">${dd}</h3>
                </div>`
            )
        })
        }
                    </div>
                  </div>
                </section>
                <section class="section-content">
                  <h2 class="section-heading">Experience</h2>
                  <ul class="list">
                    ${data.experience.map(function (dd) {
            return (
                `<li>
                    ${dd}
                </li>`
            )
        })
        }
                  </ul>
                </section>
              </div>
            </div>
          </body>
        </html>
        `
    )
}

export const headerTemplate = ({ company, company_address }) => {
    return `
        <style>
            #header,
            #footer {
                padding: 0 !important;
            }
        </style>
        <div
        class="header"
        style="
            padding: 0 !important;
            margin: 0;
            -webkit-print-color-adjust: exact;
            background-color: #3b5998;
            color: white;
            width: 100%;
            text-align: left;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        "
        >
            <h2>${company}</h2>
            <h4>${company_address}</h4>
        </div>
    `
}

export const footerTemplate = () => {
    return `
    <div
      class="footer"
      style="
        padding: 0 !important;
        margin: 0 !important;
        -webkit-print-color-adjust: exact;
        background-color: #3b5998;
        color: white;
        width: 100%;
        text-align: left;
        font-size: 12px;
        display: flex;
        justify-content: right;
      "
    >
      <p>
        Page <span class="pageNumber">1</span> of
        <span class="totalPages">10</span>
      </p>
    </div>
    `
}