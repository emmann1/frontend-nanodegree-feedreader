/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all feeds have an url and not be null', function() {
            allFeeds.forEach(function(el) {
                expect(el.url).toBeDefined();
                expect(el.url).not.toEqual('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a name and not be null', function() {
            allFeeds.forEach(function(el) {
                expect(el.name).toBeDefined();
                expect(el.name).not.toEqual('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {

        let menuIcon = $('.menu-icon-link'),
        menuPosition = [];

        beforeAll(function(done) {
            menuIcon.click();
            setTimeout(function() {
                menuPosition.push($('.slide-menu').position().left);
                menuIcon.click();
                setTimeout(function() {
                    menuPosition.push($('.slide-menu').position().left);
                    done();
                }, 270);
            }, 270);
            
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            let hiddenMenu = $('body').attr('class');
            expect(hiddenMenu).toBe('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should change visibility', function(done) {
            expect(menuPosition[0]).toBe(0);
            expect(menuPosition[1]).toBe(-192);
            done();
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('feed should not be empty', function(done) {
            let entries = document.getElementsByClassName('feed')[0].children;
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
        
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feedContent = [];
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedContent.push(document.getElementsByClassName('feed')[0].children[0].textContent);
                loadFeed(1, function() {
                    feedContent.push(document.getElementsByClassName('feed')[0].children[0].textContent);
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('feed content should change', function(done) {
            expect(feedContent[1]).not.toBe(feedContent[0]);
            done();
        });
    });
}());
