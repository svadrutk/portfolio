(()=>{var e={};e.id=541,e.ids=[541],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1038:(e,t,s)=>{"use strict";function a(e){return Math.ceil(e.replace(/[#*`~]/g,"").replace(/\s+/g," ").trim().split(" ").length/200).toString()}s.d(t,{z:()=>o,N:()=>n});let r=[{slug:"campusfy",title:"Campusfy",description:"Campusfy Updates",date:"2024-03-20",tags:["campusfy"],content:`Over the past few months, I've been working on **Campusfy** — a platform built to help students make smarter, easier decisions about the classes they take. Think of it as a more interactive, intelligent layer on top of traditional course review sites, with features that go beyond just star ratings or vague comments.

Campusfy is a web platform where students can:

- Leave detailed class reviews based on workload, teaching style, and grading emphasis.
- Discover new classes based on interests, degree requirements, or instructor quality.
- Use AI-powered insights to plan out their semesters.
- Compare course difficulty and explore patterns across departments.

Right now, we're live for **University of Wisconsin–Madison** and **University of Utah**, but that's just the beginning.

I've basically built the whole platform, but some of the things I'm most proud of include:

- **AI Advisor (Class Discovery Tool):** Built a smart filtering and recommendation system that helps students find courses based on what they actually care about (grading style, class size, reviews mentioning key terms, etc.)
- **Review Insights:** Aggregated and visualized grading patterns from hundreds of reviews to give students a quick understanding of class expectations.
- **Scalability Work:** Refactored parts of the architecture to make it easier to onboard new universities and support more user traffic.
- **User Experience:** Simplified review writing and browsing with a focus on clean UI, minimal steps, and fast performance.

We're excited to share that Campusfy has hit a couple of early growth goals:

- **1,000+ unique visitors**  
- **Over 4,000 page views**  

For something that started as a side project with a few scrappy student developers, it's amazing to see this kind of traction.

The next steps for Campusfy are all about **scale** and **value**:

- **Expansion to more schools**, starting with the University of Michigan. We've seen strong interest from students there, and we're building out the backend support to make onboarding smooth.
- **More structured academic data:** We're looking into partnerships (or scraping alternatives if needed) to integrate course catalogs, professor schedules, and grade distributions to further enrich recommendations.
- **Monetization:** We're exploring ethically sound ways to monetize — possibly through career tools or degree planning services tailored to students' actual coursework history.
- **Community features:** Think shared schedules, private recommendation lists, or alumni-backed reviews.

> Go to either of these schools and want to leave a review of your own classes? Head over to [**campusfy.app**](https://campusfy.app).`},{slug:"the-jasmine-throne",title:"The Jasmine Throne",description:"Reviewing The Jasmine Throne by Tasha Suri",date:"2024-02-28",tags:["book-review"],content:`Fantasy is my favorite genre. My first tattoo is the symbol for the Deathly Hallows 
from *Harry Potter*, and I grew up reading series like *Lord of the Rings* and 
*The Chronicles of Narnia*. Recently, I've gotten back into the genre and read things 
like *Ninth House*, *The Poppy War*, and *Fourth Wing*. One could say I've developed 
a bit of a standard for fantasy books I read:  

1. In-depth worldbuilding that isn't hard to understand.  
2. Compelling characters that don't just serve as a vehicle for the author to expound 
on their in-depth worldbuilding.  
3. Contains something that I haven't seen before in other fantasy novels—
"high fantasy" books are a dime a dozen and easy to replicate.  

This book checks all three.  

*The Jasmine Throne* follows two central characters: **Malini**, an exiled princess 
imprisoned by her zealot brother for refusing to bow to his rule and religion, and 
**Priya**, a maidservant with a secret, sacred past. Their lives intersect in 
the decaying temple-turned-palace where Malini is held captive and Priya works, setting 
off a chain of events that entangles them in rebellion, forbidden magic, and shifting 
allegiances.  

The story takes place in a fractured empire simmering with unrest. As old powers 
awaken and long-buried histories resurface, Priya and Malini must confront not 
only their personal demons but also the fate of an entire empire.  

What stood out most to me was how unapologetically **Indian** this book is. Not 
in a decorative or aesthetic sense, but in its bones. The characters have Indian names. 
The religious practices, festivals, food, languages, and power structures are all 
rooted in South Asian traditions. And none of it is filtered or over-explained for 
a Western reader—it's just *there*. As it should be.  

As someone who's Indian, it was honestly kind of healing to see our cultures and 
histories not only included but centered in a fantasy setting. It's rare 
to read something that doesn't feel like it's trying to fit into the Eurocentric mold
just to be taken seriously.  

Another thing I loved: the central relationship is sapphic, and it's powerful in 
all the right ways. It's slow-burn, complex, political, and deeply emotional. 
As a queer Indian reader, it meant so much to see two brown women at the heart of 
a fantasy novel—*not* as side characters or tokens, but as protagonists shaping 
the world around them and falling in love on their own terms.  

Even if I weren't queer, I'd still appreciate how carefully and beautifully 
it's written. The relationship feels organic, earned, and real. It's not performative —
it matters.  

*The Jasmine Throne* is the kind of book I wish had existed when I was younger. 
It's lush, defiant, tender, and fierce all at once. If you love fantasy that's 
emotionally intelligent, politically charged, and culturally rich, this 
is a must-read. I can't wait to dive into the rest of the trilogy.  

> *Representation that doesn't compromise on craft. 4 stars out of 5.*`}];function o(){return r.map(e=>({...e,readTime:a(e.content)})).sort((e,t)=>e.date<t.date?1:-1)}function n(e){let t=r.find(t=>t.slug===e);return t?{...t,readTime:a(t.content)}:null}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},4579:(e,t,s)=>{"use strict";s.r(t),s.d(t,{patchFetch:()=>p,routeModule:()=>d,serverHooks:()=>c,workAsyncStorage:()=>u,workUnitAsyncStorage:()=>h});var a={};s.r(a),s.d(a,{GET:()=>l});var r=s(6559),o=s(8088),n=s(7719),i=s(1038);async function l(e){let t=e.nextUrl.pathname.split("/").pop();try{if(!t)return Response.json(null,{status:404});let e=(0,i.N)(t);if(!e)return Response.json(null,{status:404});return Response.json(e)}catch(e){return console.error("Error reading post:",e),Response.json(null,{status:404})}}let d=new r.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/posts/[slug]/route",pathname:"/api/posts/[slug]",filename:"route",bundlePath:"app/api/posts/[slug]/route"},resolvedPagePath:"/Users/svadrut/Documents/portfolio/src/app/api/posts/[slug]/route.ts",nextConfigOutput:"standalone",userland:a}),{workAsyncStorage:u,workUnitAsyncStorage:h,serverHooks:c}=d;function p(){return(0,n.patchFetch)({workAsyncStorage:u,workUnitAsyncStorage:h})}},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},6559:(e,t,s)=>{"use strict";e.exports=s(4870)},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[719],()=>s(4579));module.exports=a})();